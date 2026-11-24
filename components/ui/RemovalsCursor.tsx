"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

/*
 * Removals-themed cursor follower (desktop / mouse only).
 *  - A navy badge carrying a detailed Royals removal van trails the pointer on
 *    a spring. The van faces the direction of travel, its wheels spin with the
 *    distance moved, and speed lines stream out behind it while moving.
 *  - A short comet trail of gold dots follows at increasing lag.
 *  - Over anything clickable the van "arrives": the badge grows, turns gold and
 *    shows a house whose door glows, with a ripple ring.
 *  - Pressing squashes it. Hidden on touch devices, when the pointer leaves the
 *    window, and for visitors who prefer reduced motion. The native cursor stays.
 */

const CLICKABLE = "a, button, [role='button'], input, textarea, select, label, summary";
const TRAIL = [0, 1, 2, 3, 4];

function Van({ flip, spin, moving }: { flip: boolean; spin: MotionValue<number>; moving: boolean }) {
  return (
    <span className="relative block" style={{ transform: flip ? "scaleX(-1)" : undefined, transition: "transform .3s" }}>
      {/* speed lines behind the van */}
      <span className={`absolute -left-3 top-1/2 flex -translate-y-1/2 flex-col gap-[3px] transition-opacity duration-200 ${moving ? "opacity-100" : "opacity-0"}`}>
        <span className="cursor-speed h-[2px] w-3 rounded-full bg-gold-light" />
        <span className="cursor-speed h-[2px] w-2 rounded-full bg-gold-light [animation-delay:.08s]" />
        <span className="cursor-speed h-[2px] w-3 rounded-full bg-gold-light [animation-delay:.16s]" />
      </span>
      <svg viewBox="0 0 44 28" className="block h-[22px] w-[35px]" aria-hidden>
        {/* box body */}
        <rect x="1" y="2" width="27" height="18" rx="2.5" fill="#F6F1E8" />
        <rect x="1" y="15.5" width="41.5" height="2" fill="#B08D57" />
        <path d="M10.4 12.5 9.2 6.8l3 2.1 2.1-3.6 2.1 3.6 3-2.1-1.2 5.7Z" fill="#B08D57" />
        {/* cab */}
        <path d="M28 7h7.2a2.2 2.2 0 0 1 1.8.9l5 6.8V20H28Z" fill="#D8C29B" />
        <path d="M30.5 9.2h4.4l3.5 4.9h-7.9Z" fill="#0E1626" />
        <rect x="40" y="16.8" width="2.6" height="1.8" rx=".6" fill="#FFF4D6" />
        {/* wheels */}
        {[9, 34].map((cx) => (
          <g key={cx} transform={`translate(${cx} 22)`}>
            <circle r="4.2" fill="#0E1626" stroke="#F6F1E8" strokeWidth="1.4" />
            <motion.g style={{ rotate: spin }}>
              <path d="M-2.2 0h4.4M0-2.2v4.4" stroke="#B08D57" strokeWidth="1.2" strokeLinecap="round" />
            </motion.g>
          </g>
        ))}
      </svg>
    </span>
  );
}

function House() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M4 15 16 5l12 10" stroke="#0E1626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 8.5V5.5h3v5.6" stroke="#0E1626" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7.5 12.5V27h17V12.5" fill="#FBF8F3" stroke="#0E1626" strokeWidth="2.2" strokeLinejoin="round" />
      <path className="cursor-door" d="M13 27v-6a3 3 0 0 1 6 0v6Z" fill="#FFD98A" />
      <rect x="10" y="14.5" width="3.6" height="3.6" rx=".6" fill="#0E1626" />
      <rect x="18.4" y="14.5" width="3.6" height="3.6" rx=".6" fill="#0E1626" />
    </svg>
  );
}

function TrailDot({ x, y, i, visible }: { x: MotionValue<number>; y: MotionValue<number>; i: number; visible: boolean }) {
  const cfg = { stiffness: 220 - i * 35, damping: 22 + i * 2, mass: 0.6 + i * 0.15 };
  const tx = useSpring(x, cfg), ty = useSpring(y, cfg);
  const size = 8 - i * 1.2;
  return (
    <motion.span style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%", width: size, height: size }}
      animate={{ opacity: visible ? 0.55 - i * 0.09 : 0 }}
      className="absolute left-0 top-0 rounded-full bg-gold" />
  );
}

export default function RemovalsCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [flip, setFlip] = useState(false);
  const [moving, setMoving] = useState(false);
  const lastX = useRef(0);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const x = useMotionValue(-200), y = useMotionValue(-200);
  const dist = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });
  const spin = useTransform(dist, (d) => d * 3);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => { fine.removeEventListener("change", update); calm.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dx = e.clientX - lastX.current;
      x.set(e.clientX); y.set(e.clientY);
      dist.set(dist.get() + Math.abs(dx) + Math.abs(e.movementY || 0));
      if (Math.abs(dx) > 2) setFlip(dx < 0);
      lastX.current = e.clientX;
      setVisible(true);
      setHovering(!!(e.target as Element | null)?.closest?.(CLICKABLE));
      setMoving(true);
      clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setMoving(false), 140);
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      clearTimeout(stopTimer.current);
    };
  }, [enabled, x, y, dist]);

  if (!enabled) return null;

  const size = hovering ? 66 : 58;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      {/* comet trail */}
      {TRAIL.map((i) => <TrailDot key={i} x={x} y={y} i={i} visible={visible && !hovering && moving} />)}

      {/* main badge */}
      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        {/* on arrival the badge steps aside (down-right) so it never covers button text */}
        <motion.div className="absolute left-0 top-0" animate={{ x: hovering ? 46 : 0, y: hovering ? 42 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}>
        {/* arrival ripple */}
        <AnimatePresence>
          {hovering && visible && (
            <motion.span key="ripple" className="absolute left-0 top-0 rounded-full border-2 border-gold"
              style={{ translateX: "-50%", translateY: "-50%" }}
              initial={{ width: 60, height: 60, opacity: 0.9 }} animate={{ width: 110, height: 110, opacity: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }} />
          )}
        </AnimatePresence>
        <motion.div
          className="grid place-items-center rounded-full border-2 shadow-[0_10px_30px_-8px_rgba(14,22,38,.55)]"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: size, height: size,
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.82 : 1,
            backgroundColor: hovering ? "#D8C29B" : "#0E1626",
            borderColor: hovering ? "#FBF8F3" : "#B08D57",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {hovering ? (
              <motion.span key="house" initial={{ scale: 0, rotate: -25, y: 6 }} animate={{ scale: 1, rotate: 0, y: 0 }} exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 480, damping: 18 }}>
                <House />
              </motion.span>
            ) : (
              <motion.span key="van" initial={{ scale: 0 }} animate={{ scale: 1, y: moving ? [0, -1.5, 0] : 0 }} exit={{ scale: 0, x: 20 }}
                transition={{ scale: { type: "spring", stiffness: 480, damping: 20 }, y: { duration: 0.28, repeat: moving ? Infinity : 0 } }}>
                <Van flip={flip} spin={spin} moving={moving} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* precise dot on the real pointer */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <motion.span className="block h-2 w-2 rounded-full bg-gold ring-2 ring-ivory-50" style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.4 : 1 }} transition={{ duration: 0.2 }} />
      </motion.div>
    </div>
  );
}
