"use client";
import { why } from "@/content/site";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const roman = ["I", "II", "III", "IV", "V", "VI"];

/** Gold spotlight that follows the pointer inside each card. */
function track(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#F6F1E8_1px,transparent_1px),linear-gradient(90deg,#F6F1E8_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="container relative max-w-[1400px]">
        <SectionHeader id="why-title" eyebrow={why.eyebrow} title={why.title} intro={why.intro} dark align="center" />
        <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.1}
              onMouseMove={track}
              className="group relative overflow-hidden rounded-[28px] border border-ivory/10 bg-ivory/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 sm:p-10">
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,0%),rgba(176,141,87,.16),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/[0.04] text-ivory ring-1 ring-gold/30 transition-all duration-500 group-hover:-rotate-6 group-hover:ring-gold">
                  <AnimatedIcon name={item.icon} className="h-8 w-8" delay={(i % 3) * 0.12} accentColor="#D8C29B" />
                </span>
                <span aria-hidden className="font-display text-3xl font-light italic text-ivory/15 transition-colors duration-500 group-hover:text-gold/70">{roman[i]}</span>
              </div>
              <h3 className="relative mt-8 font-display text-[1.65rem] font-light">{item.title}</h3>
              <p className="relative mt-4 text-[0.95rem] leading-relaxed text-ivory/60">{item.text}</p>
              <span aria-hidden className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
