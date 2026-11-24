"use client";
import { useEffect } from "react";

/*
 * Site-wide button effects for every `.btn`, wired with event delegation:
 *  - a soft light spot that follows the pointer across the button (--mx/--my)
 *  - a gentle magnetic pull toward the pointer (--tx/--ty, max ~6px)
 *  - a ripple from the exact click point
 * Styling lives in globals.css. Magnet and ripple are skipped for reduced motion.
 */
export default function ButtonFX() {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const btnOf = (t: EventTarget | null) => (t instanceof Element ? (t.closest(".btn") as HTMLElement | null) : null);
    let current: HTMLElement | null = null;

    const reset = (b: HTMLElement) => { b.style.setProperty("--tx", "0px"); b.style.setProperty("--ty", "0px"); };

    const move = (e: PointerEvent) => {
      const b = btnOf(e.target);
      if (current && current !== b) reset(current);
      current = b;
      if (!b) return;
      const r = b.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      b.style.setProperty("--mx", `${px}px`);
      b.style.setProperty("--my", `${py}px`);
      if (!calm && e.pointerType === "mouse") {
        b.style.setProperty("--tx", `${((px / r.width) - 0.5) * 10}px`);
        b.style.setProperty("--ty", `${((py / r.height) - 0.5) * 8}px`);
      }
    };
    const leave = (e: PointerEvent) => {
      const b = btnOf(e.target);
      if (b && !b.contains(e.relatedTarget as Node | null)) reset(b);
    };
    const down = (e: PointerEvent) => {
      const b = btnOf(e.target);
      if (!b || calm) return;
      const r = b.getBoundingClientRect();
      const d = Math.max(r.width, r.height) * 2.2;
      const s = document.createElement("span");
      s.className = "btn-ripple";
      s.style.width = s.style.height = `${d}px`;
      s.style.left = `${e.clientX - r.left - d / 2}px`;
      s.style.top = `${e.clientY - r.top - d / 2}px`;
      b.appendChild(s);
      s.addEventListener("animationend", () => s.remove(), { once: true });
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("pointerdown", down);
    };
  }, []);
  return null;
}
