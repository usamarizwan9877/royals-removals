"use client";
import { motion } from "framer-motion";

const STAR = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8Z";

/** Stars that pop in and fill with gold one after another when scrolled into view. */
export default function AnimatedStars({ value = 5, className = "h-6 w-6", color = "#B08D57" }: { value?: number; className?: string; color?: string }) {
  const n = Math.round(value);
  return (
    <motion.span className="flex gap-1" aria-label={`${n} out of 5 stars`} role="img" initial="hidden" whileInView="show" viewport={{ once: true }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg key={i} viewBox="0 0 24 24" className={className} aria-hidden
          variants={{ hidden: { scale: 0, rotate: -40 }, show: { scale: 1, rotate: 0, transition: { delay: 0.3 + i * 0.12, type: "spring", stiffness: 420, damping: 14 } } }}>
          <path d={STAR} fill={color} fillOpacity={i < n ? 1 : 0.2} />
        </motion.svg>
      ))}
    </motion.span>
  );
}
