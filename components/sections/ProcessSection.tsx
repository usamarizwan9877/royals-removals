"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ClipboardList, CalendarCheck, PackageOpen, KeyRound } from "lucide-react";
import { process } from "@/content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { VanGlyph } from "@/components/ui/BrandIcons";

const icons = [ClipboardList, CalendarCheck, PackageOpen, KeyRound];

/** A scroll-driven moving journey: the van drives the route as the visitor scrolls. */
export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const left = useTransform(p, [0, 1], ["0%", "100%"]);
  const active = useTransform(p, (v) => Math.min(3, Math.floor(v * 4 + 0.15)));

  return (
    <section id="how-it-works" aria-labelledby="process-title" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <SectionHeader id="process-title" eyebrow={process.eyebrow} title={process.title} intro={process.intro} />

        <div ref={ref} className="relative mt-20">
          {/* desktop route */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden lg:block">
            <div className="h-px w-full bg-[repeating-linear-gradient(90deg,rgba(14,22,38,.25)_0_6px,transparent_6px_14px)]" />
            <motion.div style={{ scaleX: p }} className="absolute inset-0 h-px origin-left bg-gold" />
            <motion.div style={{ left }} className="absolute -top-[34px] -translate-x-1/2"><VanGlyph className="h-9 w-16 drop-shadow-md" /></motion.div>
          </div>
          {/* mobile route */}
          <div aria-hidden className="absolute bottom-6 left-7 top-7 w-px bg-ink/15 lg:hidden">
            <motion.div style={{ scaleY: p }} className="absolute inset-0 origin-top bg-gold" />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {process.steps.map((s, i) => {
              const I = icons[i];
              return (
                <Reveal as="li" key={s.title} delay={i * 0.12} className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
                  <Step i={i} active={active}><I className="h-5 w-5" strokeWidth={1.5} /></Step>
                  <div className="lg:mt-8">
                    <span className="font-display text-sm italic text-gold-deep">Step {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-display text-[1.6rem] font-light leading-tight">{s.title}</h3>
                    <p className="mt-4 text-[0.93rem] leading-relaxed text-ink/65">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ i, active, children }: { i: number; active: MotionValue<number>; children: React.ReactNode }) {
  const bg = useTransform(active, (a) => (a >= i ? "#0E1626" : "#FBF8F3"));
  const color = useTransform(active, (a) => (a >= i ? "#D8C29B" : "#0E1626"));
  return (
    <motion.span style={{ backgroundColor: bg, color }} className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ink/15 shadow-card">
      {children}
    </motion.span>
  );
}
