"use client";
import { motion, type Variants } from "framer-motion";
import { included } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

/*
 * Boxes drop one by one and stack into place: each falls, squashes on landing,
 * kicks up a little dust, and casts a shadow that grows as it nears the ground.
 * The Royals crown box lands last and catches the light.
 */

const GROUND = 300;
const DX = 16; // depth offset of the top / side faces
const DY = 10;

type Box = { x: number; y: number; w: number; h: number; mark?: "fragile" | "up" | "label"; handle?: boolean; royal?: boolean };
/*
 * A proper pyramid. Every box in an upper row rests on the top faces of the two
 * boxes below it: its bottom sits half the depth back (y − DY/2) and half the
 * depth across (x + DX/2), and each row's boxes share one height so the next
 * row sits level. Gaps between neighbours are wider than DX so side faces never
 * tuck behind the next box.
 */
const ROW1 = GROUND - 80;            // bottom row: h 80
const ROW2 = ROW1 - DY / 2 - 70;     // middle row: h 70
const ROW3 = ROW2 - DY / 2 - 64;     // crown box:  h 64
const boxes: Box[] = [
  { x: 20, y: ROW1, w: 118, h: 80, mark: "label", handle: true },
  { x: 160, y: ROW1, w: 118, h: 80, mark: "fragile", handle: true },
  { x: 300, y: ROW1, w: 118, h: 80, mark: "up", handle: true },
  { x: 98, y: ROW2, w: 116, h: 70, mark: "label", handle: true },
  { x: 238, y: ROW2, w: 116, h: 70, mark: "up" },
  { x: 180, y: ROW3, w: 108, h: 64, royal: true },
];

const DUR = 0.95;
const delayOf = (i: number) => 0.35 + i * 0.24;
const landOf = (i: number) => delayOf(i) + DUR * 0.55;

const fall: Variants = {
  hidden: { y: -320, opacity: 0 },
  show: (i: number) => ({
    y: [-320, 0, -9, 0],
    opacity: [0, 1, 1, 1],
    transition: { duration: DUR, delay: delayOf(i), times: [0, 0.55, 0.75, 1], ease: ["easeIn", "easeOut", "easeIn"] },
  }),
};

const squash: Variants = {
  hidden: { scaleX: 1, scaleY: 1 },
  show: (i: number) => ({
    scaleX: [1, 1.07, 0.97, 1],
    scaleY: [1, 0.88, 1.04, 1],
    transition: { duration: 0.42, delay: landOf(i), ease: "easeOut" },
  }),
};

const shadow: Variants = {
  hidden: { opacity: 0, scaleX: 0.3 },
  show: (i: number) => ({ opacity: 1, scaleX: 1, transition: { duration: DUR * 0.55, delay: delayOf(i), ease: "easeIn" } }),
};

const dust: Variants = {
  hidden: { opacity: 0, scale: 0.2 },
  show: (i: number) => ({ opacity: [0, 0.55, 0], scale: [0.2, 1, 1.5], transition: { duration: 0.7, delay: landOf(i), ease: "easeOut" } }),
};

const C = { front: "#D9C3A0", top: "#E8D7B8", side: "#C3A77C", line: "#0E1626", tape: "#EFE3CC", tapeTop: "#F6EEDD" };
const R = { front: "#0E1626", top: "#1E2B45", side: "#070C16", ribbon: "#B08D57", ribbonTop: "#C9A56B" };

function BoxShape({ b, i }: { b: Box; i: number }) {
  const { x, y, w, h } = b;
  const c = b.royal ? R : C;
  const tape = b.royal ? R.ribbon : C.tape;
  const tapeTop = b.royal ? R.ribbonTop : C.tapeTop;
  const mid = x + w / 2;
  const top = `M${x} ${y} L${x + DX} ${y - DY} H${x + w + DX} L${x + w} ${y} Z`;
  const side = `M${x + w} ${y} L${x + w + DX} ${y - DY} V${y + h - DY} L${x + w} ${y + h} Z`;
  const stroke = { stroke: C.line, strokeOpacity: b.royal ? 0.9 : 0.45, strokeWidth: 1.1, strokeLinejoin: "round" as const };

  return (
    <motion.g custom={i} variants={squash} style={{ originX: 0.5, originY: 1 }}>
      {/* faces */}
      <path d={side} fill={c.side} {...stroke} />
      <path d={top} fill={c.top} {...stroke} />
      <rect x={x} y={y} width={w} height={h} rx="1.5" fill={c.front} {...stroke} />

      {/* flap seam + tape across the top, folding down over the front */}
      <path d={`M${x + DX / 2} ${y - DY / 2} H${x + w + DX / 2}`} stroke={C.line} strokeOpacity=".25" strokeWidth=".9" />
      <path d={`M${mid - 8} ${y} L${mid - 8 + DX} ${y - DY} H${mid + 8 + DX} L${mid + 8} ${y} Z`} fill={tapeTop} opacity=".95" />
      <rect x={mid - 8} y={y} width="16" height={b.royal ? h : 16} fill={tape} opacity=".95" />
      {b.royal && <rect x={x} y={y + h / 2 - 5} width={w} height="10" fill={R.ribbon} opacity=".95" />}

      {/* hand-hold cut-out */}
      {b.handle && <rect x={mid - 15} y={y + 26} width="30" height="7" rx="3.5" fill={C.line} fillOpacity=".55" />}

      {/* markings */}
      {b.mark === "label" && (
        <g>
          <rect x={x + 12} y={y + h - 30} width="34" height="20" rx="1.5" fill="#FBF8F3" stroke={C.line} strokeOpacity=".3" strokeWidth=".8" />
          <path d={`M${x + 16} ${y + h - 24} h22 M${x + 16} ${y + h - 19} h16 M${x + 16} ${y + h - 14} h19`} stroke={C.line} strokeOpacity=".35" strokeWidth=".9" />
        </g>
      )}
      {b.mark === "fragile" && (
        // wine-glass "fragile" symbol
        <g stroke="#8C6D3D" strokeWidth="1.3" fill="none" strokeLinecap="round" transform={`translate(${x + 24} ${y + h - 34})`}>
          <path d="M-6 0 h12 l-1.5 8 a4.5 4.5 0 0 1 -9 0 z" />
          <path d="M0 12.5 V20 M-4.5 20 h9" />
          <path d="M1.5 1 l-2.5 3.5 2 1.5 -2 3" strokeWidth="1" />
        </g>
      )}
      {b.mark === "up" && (
        // "this way up" arrows
        <g stroke="#8C6D3D" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${x + w - 28} ${y + h - 14})`}>
          <path d="M-5 0 V-15 M-9 -11 l4 -4 4 4" />
          <path d="M5 0 V-15 M1 -11 l4 -4 4 4" />
          <path d="M-10 3 h20" />
        </g>
      )}

      {/* the Royals crown box */}
      {b.royal && (
        <g transform={`translate(${mid} ${y + h / 2})`}>
          <circle r="17" fill={R.front} stroke={R.ribbonTop} strokeWidth="1.2" />
          <path d="M-9 5 L-11 -6 L-4.5 -1 L0 -9 L4.5 -1 L11 -6 L9 5 Z" fill="#D8C29B" stroke="#D8C29B" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="0" cy="-9" r="1.4" fill="#D8C29B" />
          <circle cx="-11" cy="-6" r="1.2" fill="#D8C29B" />
          <circle cx="11" cy="-6" r="1.2" fill="#D8C29B" />
        </g>
      )}
    </motion.g>
  );
}

export default function IncludedSection() {
  const royal = boxes[5];
  const royalLanded = landOf(5);

  return (
    <section id="whats-included" aria-labelledby="included-title" className="relative overflow-hidden bg-[#EFE6D5] py-24 sm:py-32">
      <div className="container grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal><SectionTitle id="included-title" title={included.title} className="text-ink" /></Reveal>
          <Reveal delay={0.1}><p className="mt-8 max-w-xl text-[1.06rem] leading-[1.85] text-ink/70">{included.body}</p></Reveal>
        </div>

        <motion.svg viewBox="0 -14 450 334" className="mx-auto w-full max-w-[540px] overflow-visible" aria-hidden initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
          <defs>
            <clipPath id="royal-front"><rect x={royal.x} y={royal.y} width={royal.w} height={royal.h} rx="1.5" /></clipPath>
            <linearGradient id="shine" x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".28" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* floor */}
          <motion.ellipse cx="228" cy={GROUND + 6} rx="222" ry="10" fill="#0E1626" fillOpacity=".05"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }} />
          <motion.line x1="4" y1={GROUND} x2="446" y2={GROUND} stroke="#0E1626" strokeOpacity=".25"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1 } } }} />

          {boxes.map((b, i) => (
            <g key={i}>
              {/* shadow on whatever the box lands on */}
              <motion.ellipse custom={i} variants={shadow} cx={b.x + b.w / 2 + DX / 2} cy={b.y + b.h} rx={b.w / 2 + 4} ry="4"
                fill="#0E1626" fillOpacity=".16" style={{ originX: 0.5, originY: 0.5 }} />
              <motion.g custom={i} variants={fall}>
                <BoxShape b={b} i={i} />
              </motion.g>
              {/* dust puffs at both corners on landing */}
              {[b.x - 2, b.x + b.w + 6].map((cx, k) => (
                <motion.circle key={k} custom={i} variants={dust} cx={cx} cy={b.y + b.h - 3} r="7" fill="#FBF8F3" style={{ originX: 0.5, originY: 0.5 }} />
              ))}
            </g>
          ))}

          {/* light sweeping across the crown box, then sparkles */}
          <g clipPath="url(#royal-front)"><g transform="skewX(-18)">
            <motion.rect y={royal.y - 10} width="46" height={royal.h + 20} fill="url(#shine)"
              variants={{
                hidden: { x: royal.x - 40 },
                show: { x: [royal.x - 40, royal.x + royal.w + 100], transition: { duration: 1.1, delay: royalLanded + 0.5, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" } },
              }} />
          </g></g>
          {[
            { cx: royal.x + royal.w + 26, cy: royal.y - 18, s: 1 },
            { cx: royal.x - 14, cy: royal.y - 4, s: 0.7 },
            { cx: royal.x + royal.w / 2 + 8, cy: royal.y - 30, s: 0.55 },
          ].map((p, k) => (
            <motion.path key={k} d={`M${p.cx} ${p.cy - 8 * p.s} L${p.cx + 2 * p.s} ${p.cy - 2 * p.s} L${p.cx + 8 * p.s} ${p.cy} L${p.cx + 2 * p.s} ${p.cy + 2 * p.s} L${p.cx} ${p.cy + 8 * p.s} L${p.cx - 2 * p.s} ${p.cy + 2 * p.s} L${p.cx - 8 * p.s} ${p.cy} L${p.cx - 2 * p.s} ${p.cy - 2 * p.s} Z`}
              fill="#B08D57" style={{ originX: 0.5, originY: 0.5 }}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                show: { opacity: [0, 1, 0], scale: [0, 1, 0], transition: { duration: 1.4, delay: royalLanded + 0.3 + k * 0.35, repeat: Infinity, repeatDelay: 2.4 } },
              }} />
          ))}
        </motion.svg>
      </div>
    </section>
  );
}
