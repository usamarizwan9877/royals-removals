"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { process } from "@/content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

/*
 * Scroll-driven journey: as the visitor scrolls, the van drives the route and
 * parks at each step in turn. Reached steps light up, pulse, and earn a gold tick.
 */

// Scroll progress → route position. Flat segments make the van pause at each step.
const SCROLL = [0, 0.1, 0.28, 0.4, 0.58, 0.7, 0.88, 1];
const ROUTE = [0, 0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1, 1];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.5 });
  const pos = useTransform(smooth, SCROLL, ROUTE);
  const [reached, setReached] = useState(0);
  useMotionValueEvent(pos, "change", (v) => {
    const r = Math.min(3, Math.floor(v * 3 + 0.04));
    setReached((cur) => (cur === r ? cur : r));
  });

  return (
    <section id="how-it-works" aria-labelledby="process-title" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <SectionHeader id="process-title" eyebrow={process.eyebrow} title={process.title} intro={process.intro} />

        <div ref={ref} className="relative mt-20">
          <DesktopRoute pos={pos} />
          {/* mobile: vertical route */}
          <div aria-hidden className="absolute bottom-10 left-10 top-10 w-[3px] -translate-x-1/2 rounded-full bg-ink/10 lg:hidden">
            <motion.div style={{ scaleY: pos }} className="absolute inset-0 origin-top rounded-full bg-gold" />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {process.steps.map((s, i) => {
              const on = reached >= i;
              return (
                <Reveal as="li" key={s.title} delay={i * 0.12} className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
                  <Step i={i} on={on} done={reached > i} />
                  <motion.div className="lg:mt-8" animate={{ opacity: on ? 1 : 0.55 }} transition={{ duration: 0.5 }}>
                    <span className="font-display text-sm italic text-gold-deep">Step {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-display text-[1.6rem] font-light leading-tight">{s.title}</h3>
                    <p className="mt-4 text-[0.93rem] leading-relaxed text-ink/65">{s.text}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function DesktopRoute({ pos }: { pos: MotionValue<number> }) {
  const left = useTransform(pos, (v) => `${v * 100}%`);
  const spin = useTransform(pos, (v) => v * 2400);
  return (
    // spans circle centre to circle centre; line sits at the circles' mid-height (40px)
    <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-10 hidden lg:block">
      <div className="absolute inset-x-0 -top-px h-[3px] rounded-full bg-ink/[0.07]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[repeating-linear-gradient(90deg,rgba(14,22,38,.3)_0_6px,transparent_6px_14px)]" />
      <motion.div style={{ scaleX: pos }} className="absolute inset-x-0 -top-px h-[3px] origin-left rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-deep" />
      {/* van parks just before each step's circle (circle radius 40px + gap) */}
      <motion.div style={{ left }} className="absolute bottom-0 z-20">
        <div className="-translate-x-[calc(100%+46px)]">
          <Van spin={spin} />
        </div>
      </motion.div>
    </div>
  );
}

function Van({ spin }: { spin: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 80 42" className="block h-[42px] w-20 drop-shadow-[0_4px_6px_rgba(14,22,38,.18)]">
      <ellipse cx="40" cy="41" rx="34" ry="1.6" fill="#0E1626" fillOpacity=".15" />
      <rect x="2" y="4" width="50" height="29" rx="3.5" fill="#0E1626" />
      <path d="M52 12h13a3.5 3.5 0 0 1 2.9 1.5l7.6 10.6V33H52Z" fill="#1E2B45" />
      <path d="M56 15.5h8.6l5.6 8H56Z" fill="#D8C29B" />
      <rect x="2" y="27" width="73.5" height="2.4" fill="#B08D57" />
      <path d="M20 21.5 17.5 12l5.8 4 3.7-6.5 3.7 6.5 5.8-4-2.5 9.5Z" fill="#B08D57" />
      <rect x="72" y="25" width="3.5" height="2.6" rx=".8" fill="#F6F1E8" />
      {[16, 62].map((cx) => (
        <g key={cx} transform={`translate(${cx} 34)`}>
          <circle r="6" fill="#0E1626" stroke="#FBF8F3" strokeWidth="1.6" />
          <motion.g style={{ rotate: spin }}>
            <path d="M-3.2 0h6.4M0-3.2v6.4" stroke="#B08D57" strokeWidth="1.3" strokeLinecap="round" />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

function Step({ i, on, done }: { i: number; on: boolean; done: boolean }) {
  const Icon = STEP_ICONS[i];
  return (
    <span className="relative z-10 shrink-0">
      {/* pulse ring when the step is reached */}
      <AnimatePresence>
        {on && (
          <motion.span key="pulse" className="absolute inset-0 rounded-full border-2 border-gold"
            initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} />
        )}
      </AnimatePresence>
      <motion.span
        className="relative grid h-20 w-20 place-items-center rounded-full border shadow-card"
        animate={{
          backgroundColor: on ? "#0E1626" : "#FBF8F3",
          borderColor: on ? "rgba(176,141,87,.7)" : "rgba(14,22,38,.12)",
          scale: on ? 1.06 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <span className="absolute inset-[5px] rounded-full border border-dashed" style={{ borderColor: on ? "rgba(216,194,155,.35)" : "rgba(14,22,38,.08)" }} />
        <motion.span animate={{ rotate: on ? [0, -8, 6, 0] : 0, scale: on ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.6 }}>
          <Icon on={on} />
        </motion.span>
      </motion.span>
      {/* gold tick once the van has moved on */}
      <AnimatePresence>
        {done && (
          <motion.span key="tick" className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gold text-ivory-50 shadow-card ring-4 ring-ivory-50"
            initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" /></svg>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ── Step illustrations (duotone: line + gold accent) ───────────────── */
type IconProps = { on: boolean };
const line = (on: boolean) => (on ? "#F6F1E8" : "#0E1626");
const gold = (on: boolean) => (on ? "#D8C29B" : "#B08D57");
const svgProps = { viewBox: "0 0 36 36", className: "h-9 w-9", fill: "none", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

/** 1 · Free quote — a quote sheet with a £ seal */
function QuoteIcon({ on }: IconProps) {
  return (
    <svg {...svgProps} stroke={line(on)}>
      <path d="M8 4.5h13l6 6V28a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 6 28V7a2.5 2.5 0 0 1 2-2.5Z" />
      <path d="M21 4.5V10.5h6" />
      <path d="M10.5 14h9M10.5 18.5h11M10.5 23h5" strokeOpacity=".55" />
      <circle cx="25.5" cy="25.5" r="6" fill={gold(on)} stroke="none" />
      <text x="25.5" y="28.6" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={on ? "#0E1626" : "#FBF8F3"} stroke="none" fontFamily="system-ui, sans-serif">£</text>
    </svg>
  );
}

/** 2 · Book — calendar with the moving day ticked */
function BookIcon({ on }: IconProps) {
  return (
    <svg {...svgProps} stroke={line(on)}>
      <rect x="5" y="7.5" width="26" height="23" rx="3" />
      <path d="M5 13.5h26" />
      <path d="M11.5 4.5v5M24.5 4.5v5" />
      <path d="M10 18h2M15 18h2M20 18h2M10 23h2M15 23h2" strokeOpacity=".5" />
      <circle cx="24" cy="23.5" r="4.8" fill={gold(on)} stroke="none" />
      <path d="M21.8 23.6l1.6 1.6 2.9-3.2" stroke={on ? "#0E1626" : "#FBF8F3"} strokeWidth="1.7" />
    </svg>
  );
}

/** 3 · Heavy lifting — hand truck carrying boxes */
function LiftIcon({ on }: IconProps) {
  return (
    <svg {...svgProps} stroke={line(on)}>
      <path d="M7 4.5 10 6v21.5h18" />
      <circle cx="11" cy="29.5" r="2.6" />
      <rect x="13" y="17" width="13" height="10.5" rx="1" />
      <path d="M19.5 17v4" strokeOpacity=".6" />
      <rect x="14.5" y="8" width="10" height="9" rx="1" fill={gold(on)} fillOpacity=".9" />
      <path d="M19.5 8v3" stroke={on ? "#0E1626" : "#FBF8F3"} />
    </svg>
  );
}

/** 4 · New home — house with a gold key */
function HomeIcon({ on }: IconProps) {
  return (
    <svg {...svgProps} stroke={line(on)}>
      <path d="M4.5 16 18 5l13.5 11" />
      <path d="M8 13.5V30h20V13.5" />
      <path d="M14.5 30v-7a3.5 3.5 0 0 1 7 0v7" fill={gold(on)} fillOpacity=".35" />
      <g stroke={gold(on)} strokeWidth="1.8">
        <circle cx="26" cy="7.5" r="2.8" />
        <path d="M27.8 9.6l4.7 5.2M30.4 12.5l-1.5 1.4M31.8 14l-1.5 1.4" />
      </g>
    </svg>
  );
}

const STEP_ICONS = [QuoteIcon, BookIcon, LiftIcon, HomeIcon];
