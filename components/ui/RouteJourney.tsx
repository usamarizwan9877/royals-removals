"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

/**
 * Signature motif: a road from the old home to the new one. A Royals van drives it,
 * leaving a gold trail; trees pass by; the new home's windows light up on arrival.
 * Pure SVG driven by one motion value (no React re-renders while animating).
 */
const ROAD = "M128 112 C 330 112, 360 50, 600 60 S 860 114, 1058 94";
const TREES = [0.17, 0.36, 0.55, 0.74, 0.88];

export default function RouteJourney({ className = "", tone = "ink", d = ROAD }: { className?: string; tone?: "ink" | "ivory"; d?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const vanRef = useRef<SVGGElement>(null);
  const wheelRefs = useRef<(SVGGElement | null)[]>([]);
  const treeRefs = useRef<(SVGGElement | null)[]>([]);
  const glowRef = useRef<SVGGElement>(null);
  const progress = useMotionValue(0);
  const reduce = useReducedMotion();
  const inView = useInView(svgRef, { margin: "-10% 0px" });

  const ink = tone === "ink";
  const stroke = ink ? "#0E1626" : "#F6F1E8";
  const houseFill = ink ? "#FBF8F3" : "#152036";
  const vanBody = ink ? "#0E1626" : "#F6F1E8";
  const vanCab = ink ? "#1E2B45" : "#D8C29B";

  useEffect(() => {
    const path = pathRef.current, trail = trailRef.current, van = vanRef.current, glow = glowRef.current;
    if (!path || !trail || !van || !glow) return;
    const len = path.getTotalLength();
    trail.style.strokeDasharray = `${len}`;

    // Trees sit just above the road, facing up regardless of the road's slope.
    TREES.forEach((t, i) => {
      const el = treeRefs.current[i];
      if (!el) return;
      const p = path.getPointAtLength(t * len);
      el.setAttribute("transform", `translate(${p.x} ${p.y - 14})`);
    });

    const place = (p: number) => {
      const dist = p * len;
      const a = path.getPointAtLength(dist);
      const b = path.getPointAtLength(Math.min(len, dist + 1));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      van.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle})`);
      van.style.opacity = String(Math.min(1, p / 0.03 + 0.001));
      trail.style.strokeDashoffset = String(len - dist);
      const spin = (dist / 4.2) * (180 / Math.PI);
      wheelRefs.current.forEach((w) => w?.setAttribute("transform", `rotate(${spin})`));
      glow.style.opacity = String(Math.max(0, (p - 0.9) / 0.1));
    };

    place(reduce ? 1 : progress.get());
    if (reduce || !inView) return;
    const unsub = progress.on("change", place);
    const controls = animate(progress, [0, 1], { duration: 9, ease: [0.45, 0.05, 0.4, 1], repeat: Infinity, repeatDelay: 2.4 });
    return () => { unsub(); controls.stop(); };
  }, [reduce, inView, progress]);

  const House = ({ x, y, scale = 1, children }: { x: number; y: number; scale?: number; children?: React.ReactNode }) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={stroke} strokeWidth="1.3" fill="none" strokeLinejoin="round">
      <ellipse cx="0" cy="2" rx="40" ry="4" fill={stroke} fillOpacity=".07" stroke="none" />
      <path d="M16 -40 V-52 H24 V-32" fill={houseFill} />
      <path d="M-28 0 V-32 L0 -56 L28 -32 V0 Z" fill={houseFill} />
      <path d="M-36 -26 L0 -60 L36 -26" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M-7 0 V-17 a7 7 0 0 1 14 0 V0" fill="#B08D57" fillOpacity=".18" />
      <rect x="-20" y="-30" width="9" height="9" rx="1" />
      <rect x="11" y="-30" width="9" height="9" rx="1" />
      {children}
    </g>
  );

  const Tree = ({ i, tall = false }: { i: number; tall?: boolean }) => (
    <g ref={(el) => { treeRefs.current[i] = el; }} opacity=".55">
      <path d="M0 0 V-8" stroke={stroke} strokeWidth="1.2" />
      {tall ? (
        <path d="M0 -26 L7 -8 H-7 Z" fill="#B08D57" fillOpacity=".25" stroke="#B08D57" strokeWidth="1" strokeLinejoin="round" />
      ) : (
        <circle cx="0" cy="-14" r="7" fill="#B08D57" fillOpacity=".25" stroke="#B08D57" strokeWidth="1" />
      )}
    </g>
  );

  return (
    <svg ref={svgRef} viewBox="0 -28 1200 178" overflow="visible" className={className} fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
      {/* trees behind the road */}
      {TREES.map((_, i) => <Tree key={i} i={i} tall={i % 2 === 1} />)}

      {/* road: soft verge, tarmac, centre dashes, gold trail behind the van */}
      <path d={d} stroke={stroke} strokeOpacity=".05" strokeWidth="22" strokeLinecap="round" />
      <path d={d} stroke={stroke} strokeOpacity=".1" strokeWidth="12" strokeLinecap="round" />
      <path ref={pathRef} d={d} stroke={ink ? "#FBF8F3" : "#F6F1E8"} strokeOpacity=".9" strokeWidth="1.2" className="route-dash" />
      <path ref={trailRef} d={d} stroke="#B08D57" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />

      {/* old home, with packed boxes waiting outside */}
      <House x={74} y={118}>
        <g fill="#D8C29B" stroke="#8C6D3D" strokeWidth="1">
          <rect x="30" y="-12" width="12" height="12" rx="1" />
          <rect x="44" y="-9" width="9" height="9" rx="1" />
          <rect x="33" y="-22" width="9" height="10" rx="1" />
        </g>
      </House>

      {/* new home: windows light up and the pin glows when the van arrives */}
      <House x={1126} y={98} scale={1.08}>
        <g ref={glowRef} style={{ opacity: 0, transition: "opacity .4s" }} stroke="none">
          <rect x="-19.5" y="-29.5" width="8" height="8" fill="#D8C29B" />
          <rect x="11.5" y="-29.5" width="8" height="8" fill="#D8C29B" />
          <circle cx="0" cy="-82" r="13" fill="#B08D57" fillOpacity=".18" />
        </g>
        <g className="route-pin" stroke="none">
          <path d="M0 -70 c-6 -7 -9 -11 -9 -15.5 a9 9 0 0 1 18 0 c0 4.5 -3 8.5 -9 15.5z" fill="#B08D57" />
          <path d="M-4 -86.5 l1.6 3 2.4 -3.6 2.4 3.6 1.6 -3 v4.8 h-8z" fill="#FBF8F3" />
        </g>
      </House>

      {/* the van — origin is the road point under its centre */}
      <g ref={vanRef} style={{ opacity: 0 }}>
        <ellipse cx="0" cy="1" rx="26" ry="3" fill="#0E1626" fillOpacity=".18" />
        <g className="route-van-bob">
          <rect x="-27" y="-27" width="36" height="23" rx="3" fill={vanBody} />
          <path d="M9 -20 h10 a3 3 0 0 1 2.5 1.3 l5 7.3 V-4 H9 Z" fill={vanCab} />
          <path d="M12 -17.5 h6.5 l4.3 6.2 H12 z" fill={ink ? "#D8C29B" : "#0E1626"} />
          <rect x="-27" y="-8" width="54" height="2" fill="#B08D57" />
          <path d="M-13.5 -20.5 l2.2 4 3.3 -4.8 3.3 4.8 2.2 -4 v6.5 h-11z" fill="#B08D57" />
          <rect x="24" y="-9" width="3" height="2.5" rx=".8" fill="#F6F1E8" />
        </g>
        {[-15, 15].map((cx, i) => (
          <g key={cx} transform={`translate(${cx} -3)`}>
            <circle r="4.6" fill="#0E1626" stroke={ink ? "#FBF8F3" : "#F6F1E8"} strokeWidth="1.3" />
            <g ref={(el) => { wheelRefs.current[i] = el; }}>
              <path d="M-2.4 0 H2.4 M0 -2.4 V2.4" stroke="#B08D57" strokeWidth="1" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
