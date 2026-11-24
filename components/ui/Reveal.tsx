"use client";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "article" };

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: Props) {
  const Comp = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
}
