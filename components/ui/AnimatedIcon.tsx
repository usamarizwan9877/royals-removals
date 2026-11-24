"use client";
import { motion } from "framer-motion";

/*
 * Animated duotone icon set.
 *  - Lines draw themselves in when the icon scrolls into view.
 *  - A gold accent part pops in, then plays a small idle motion every few
 *    seconds (bounce, wiggle, pulse…). Hovering the parent `.group` speeds it up.
 *  - All motion is disabled for visitors who prefer reduced motion (globals.css).
 */

type Anim = "bounce" | "wiggle" | "pulse" | "spin" | "flash" | "drive" | "swing" | "lift" | "float";
type Accent = { d: string; fill?: boolean; origin?: string };
type Def = { lines: string[]; accent: Accent[]; anim: Anim };

const ICONS = {
  home: { lines: ["M3 11 12 3.5l9 7.5", "M5.5 9.5V20.5h13V9.5"], accent: [{ d: "M10 20.5v-4.5a2 2 0 0 1 4 0v4.5Z", fill: true }], anim: "float" },
  sofa: {
    lines: ["M4.5 11V8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3", "M2.5 13a1.8 1.8 0 0 1 3.5-.5V15h12v-2.5a1.8 1.8 0 0 1 3.5.5v4a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1Z", "M5 18v2.5M19 18v2.5"],
    accent: [{ d: "M7.5 11.5h9V14h-9Z", fill: true }], anim: "bounce",
  },
  briefcase: {
    lines: ["M3.5 8.5h17v11h-17Z", "M9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5", "M3.5 13h17"],
    accent: [{ d: "M10.5 11.5h3v3h-3Z", fill: true }], anim: "wiggle",
  },
  building: {
    lines: ["M3 20.5V9l9-5 9 5v11.5", "M7 20.5V13h10v7.5", "M7 16.5h10"],
    accent: [{ d: "M10.5 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0", fill: true }], anim: "pulse",
  },
  package: {
    lines: ["M12 3 20.5 7.5v9L12 21l-8.5-4.5v-9Z", "M3.5 7.5 12 12l8.5-4.5", "M12 12v9"],
    accent: [{ d: "M7.3 5.2l8.6 4.6v2.8l-2-1V9.9L5.4 6.2Z", fill: true }], anim: "bounce",
  },
  truck: {
    lines: ["M2.5 6.5h11v10h-11Z", "M13.5 9.5h4l3.5 3.5v3.5h-7.5", "M5 18.25a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 1 0-3.5 0", "M15.5 18.25a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 1 0-3.5 0"],
    accent: [{ d: "M15 11h2.4l2 2H15Z", fill: true }, { d: "M5 10h5", origin: "left" }], anim: "drive",
  },
  dumbbell: {
    lines: ["M6.5 7v10M17.5 7v10", "M4 9.5v5M20 9.5v5", "M6.5 12h2M15.5 12h2"],
    accent: [{ d: "M8.5 10.75h7v2.5h-7Z", fill: true }], anim: "lift",
  },
  crown: {
    lines: ["M4.5 18 3 7.5l5 4 4-6.5 4 6.5 5-4-1.5 10.5Z", "M4.5 20.5h15"],
    accent: [{ d: "M10.75 14a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0-2.5 0", fill: true }], anim: "float",
  },
  zap: { lines: ["M13 2.5 4.5 13.5H11l-1 8 8.5-11H12Z"], accent: [{ d: "M13 2.5 4.5 13.5H11l-1 8 8.5-11H12Z", fill: true }], anim: "flash" },
  shield: {
    lines: ["M12 3 19.5 6v6c0 4.5-3.2 7.8-7.5 9-4.3-1.2-7.5-4.5-7.5-9V6Z"],
    accent: [{ d: "M8.75 12.2l2.25 2.3 4.25-4.5" }], anim: "pulse",
  },
  calendar: {
    lines: ["M4 6.5h16v14H4Z", "M4 10.5h16", "M8.5 4v4M15.5 4v4"],
    accent: [{ d: "M13.5 13.5h3.5V17h-3.5Z", fill: true }], anim: "pulse",
  },
  receipt: {
    lines: ["M20.5 11.5V4.5a1 1 0 0 0-1-1h-7L3.8 12.2a1.5 1.5 0 0 0 0 2.1l6.9 6.9a1.5 1.5 0 0 0 2.1 0Z"],
    accent: [{ d: "M14.75 7.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0", fill: true }], anim: "swing",
  },
  map: {
    lines: ["M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2Z", "M9 4.5v13"],
    accent: [{ d: "M15 7.5a2.6 2.6 0 0 1 2.6 2.6c0 2.1-2.6 4.6-2.6 4.6s-2.6-2.5-2.6-4.6A2.6 2.6 0 0 1 15 7.5Z", fill: true }], anim: "bounce",
  },
  pin: {
    lines: ["M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"],
    accent: [{ d: "M9.75 10a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0-4.5 0", fill: true }], anim: "bounce",
  },
  phone: {
    lines: ["M5 3.5h3.2l1.6 4.2-2.1 1.3a11 11 0 0 0 5.3 5.3l1.3-2.1 4.2 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z"],
    accent: [{ d: "M14.5 3.5a6 6 0 0 1 6 6M14.5 6.75a2.75 2.75 0 0 1 2.75 2.75" }], anim: "wiggle",
  },
  stopwatch: {
    lines: ["M12 21.5a7.75 7.75 0 1 0 0-15.5 7.75 7.75 0 0 0 0 15.5Z", "M10 2.5h4M12 2.5V6", "M18.5 6.5l1.2-1.2"],
    accent: [{ d: "M12 13.75V9.5", origin: "bottom" }], anim: "spin",
  },
  parking: {
    lines: ["M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18V6A1.5 1.5 0 0 1 5 4.5Z"],
    accent: [{ d: "M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" }], anim: "pulse",
  },
  star: {
    lines: ["M12 3l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.3l-5.4 2.9 1.2-5.9L3.4 9.2l6-.7Z"],
    accent: [{ d: "M12 8.2l1.2 2.5 2.7.3-2 1.9.5 2.7L12 14.3l-2.4 1.3.5-2.7-2-1.9 2.7-.3Z", fill: true }], anim: "spin",
  },
  book: {
    lines: ["M12 6.5C10 5 7 4.5 3.5 5v13.5c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5c-3.5-.5-6.5 0-8.5 1.5Z", "M12 6.5V20"],
    accent: [{ d: "M15 4.5h3v6l-1.5-1.2L15 10.5Z", fill: true }], anim: "bounce",
  },
  leaf: {
    lines: ["M5 19C5 10.5 10.5 5 20 5c0 9.5-5.5 15-15 14Z"],
    accent: [{ d: "M5 19c3.5-4.5 7-7.5 10.5-10" }], anim: "swing",
  },
} satisfies Record<string, Def>;

export type AnimatedIconName = keyof typeof ICONS;

export default function AnimatedIcon({
  name, className = "h-6 w-6", delay = 0, accentColor = "#B08D57", strokeWidth = 1.5,
}: { name: string; className?: string; delay?: number; accentColor?: string; strokeWidth?: number }) {
  const def: Def = (ICONS as Record<string, Def>)[name] ?? ICONS.package;
  return (
    <motion.svg viewBox="0 0 24 24" className={`ai ${className}`} fill="none" aria-hidden
      initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      {def.lines.map((d, i) => (
        <motion.path key={i} d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.9, delay: delay + i * 0.15, ease: "easeInOut" } } }} />
      ))}
      <motion.g variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { delay: delay + 0.6, type: "spring", stiffness: 320, damping: 14 } } }}
        style={{ originX: 0.5, originY: 0.5 }}>
        <g className={`ai-acc ai-${def.anim}`} style={{ transformOrigin: def.accent[0].origin === "bottom" ? "50% 100%" : def.accent[0].origin === "left" ? "0% 50%" : undefined, animationDelay: `${delay + 1.6}s` }}>
          {def.accent.map((a, i) =>
            a.fill ? (
              <path key={i} d={a.d} fill={accentColor} fillOpacity=".9" stroke={accentColor} strokeWidth={strokeWidth * 0.6} strokeLinejoin="round" />
            ) : (
              <path key={i} d={a.d} stroke={accentColor} strokeWidth={strokeWidth + 0.2} strokeLinecap="round" strokeLinejoin="round" />
            ),
          )}
        </g>
      </motion.g>
    </motion.svg>
  );
}
