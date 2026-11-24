"use client";
import { motion } from "framer-motion";
import { included } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

/* Boxes that drop and stack into place — an understated, physical metaphor. */
const boxes = [
  { x: 40, y: 200, w: 120, h: 90 }, { x: 170, y: 200, w: 140, h: 90 }, { x: 320, y: 215, w: 90, h: 75 },
  { x: 80, y: 115, w: 110, h: 85 }, { x: 200, y: 125, w: 120, h: 75 },
  { x: 130, y: 50, w: 100, h: 65 },
];

export default function IncludedSection() {
  return (
    <section id="whats-included" aria-labelledby="included-title" className="relative overflow-hidden bg-[#EFE6D5] py-24 sm:py-32">
      <div className="container grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal><SectionTitle id="included-title" title={included.title} className="text-ink" /></Reveal>
          <Reveal delay={0.1}><p className="mt-8 max-w-xl text-[1.06rem] leading-[1.85] text-ink/70">{included.body}</p></Reveal>
        </div>
        <motion.svg viewBox="0 0 450 310" className="mx-auto w-full max-w-[520px]" aria-hidden initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}>
          <motion.line x1="10" y1="291" x2="440" y2="291" stroke="#0E1626" strokeOpacity=".25" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1 } } }} />
          {boxes.map((b, i) => (
            <motion.g key={i}
              variants={{ hidden: { y: -260, opacity: 0, rotate: i % 2 ? 6 : -6 }, show: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 160, damping: 17, delay: 0.3 + i * 0.18 } } }}
              style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h}px` }}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill={i === 5 ? "#0E1626" : "#D9C3A0"} stroke="#0E1626" strokeOpacity=".55" strokeWidth="1.2" />
              <rect x={b.x + b.w / 2 - 9} y={b.y} width="18" height={b.h} fill={i === 5 ? "#B08D57" : "#F6F1E8"} opacity=".75" />
              <path d={`M${b.x + 12} ${b.y + b.h - 18} h22 M${b.x + 12} ${b.y + b.h - 12} h14`} stroke="#0E1626" strokeOpacity=".4" />
              {i === 5 && <path d={`M${b.x + b.w / 2 - 12} ${b.y + 40} l-4-16 10 7 6-11 6 11 10-7 -4 16z`} fill="none" stroke="#D8C29B" strokeWidth="1.3" strokeLinejoin="round" />}
            </motion.g>
          ))}
        </motion.svg>
      </div>
    </section>
  );
}
