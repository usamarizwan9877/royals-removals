"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

/**
 * Signature motif: a fine gold route from one home to another, with a removal
 * van travelling along it. Pure SVG + one motion value (no re-renders).
 */
export default function RouteJourney({ className = "", tone = "ink", d = "M70 92 C 300 92, 330 30, 600 46 S 900 98, 1130 70" }: { className?: string; tone?: "ink" | "ivory"; d?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const vanRef = useRef<SVGGElement>(null);
  const progress = useMotionValue(0);
  const reduce = useReducedMotion();
  const inView = useInView(svgRef, { margin: "-10% 0px" });
  const stroke = tone === "ink" ? "#0E1626" : "#F6F1E8";

  useEffect(() => {
    const path = pathRef.current, van = vanRef.current;
    if (!path || !van) return;
    const len = path.getTotalLength();
    const place = (p: number) => {
      const a = path.getPointAtLength(p * len);
      const b = path.getPointAtLength(Math.min(len, p * len + 1));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      van.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle}) translate(-22 -22)`);
    };
    place(reduce ? 1 : progress.get());
    if (reduce || !inView) return;
    const unsub = progress.on("change", place);
    const controls = animate(progress, [0, 1], { duration: 9, ease: [0.45, 0.05, 0.4, 1], repeat: Infinity, repeatDelay: 2.2 });
    return () => { unsub(); controls.stop(); };
  }, [reduce, inView, progress]);

  const House = ({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) => (
    <g transform={`translate(${x} ${y}) ${flip ? "scale(-1 1)" : ""}`} stroke={stroke} strokeWidth="1.3" fill="none" strokeLinejoin="round">
      <path d="M-26 0 V-30 L0 -52 L26 -30 V0 Z" fill={tone === "ink" ? "#FBF8F3" : "#0E1626"} />
      <path d="M-8 0 V-16 H8 V0" /><path d="M10 -36 h8 v8 h-8 z" /><path d="M-18 -36 h8 v8 h-8 z" />
      <path d="M-34 -24 L0 -56 L34 -24" stroke="#B08D57" />
    </g>
  );

  return (
    <svg ref={svgRef} viewBox="0 0 1200 130" className={className} fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
      <path d={d} stroke={stroke} strokeOpacity=".12" strokeWidth="9" strokeLinecap="round" />
      <path ref={pathRef} d={d} stroke="#B08D57" strokeWidth="1.4" className="route-dash" />
      <House x={70} y={104} />
      <House x={1130} y={82} flip />
      <g ref={vanRef}>
        <g transform="translate(0 4)">
          <rect x="0" y="6" width="27" height="17" rx="2" fill="#0E1626" />
          <path d="M27 11h8.5a2 2 0 0 1 1.7.9L42 18v5H27V11Z" fill="#1E2B45" />
          <path d="M30 13h5l3 4.5h-8z" fill="#D8C29B" />
          <path d="M5 12h16" stroke="#B08D57" strokeWidth=".9" />
          <circle cx="9" cy="24" r="3.4" fill="#0E1626" stroke="#F6F1E8" strokeWidth="1.2" />
          <circle cx="34" cy="24" r="3.4" fill="#0E1626" stroke="#F6F1E8" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}
