import { trustBar } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import AnimatedIcon from "@/components/ui/AnimatedIcon";

const icons = ["pin", "phone", "shield", "stopwatch"];

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="relative overflow-hidden bg-ink text-ivory">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container grid max-w-[1400px] grid-cols-2 divide-ivory/10 lg:grid-cols-4 lg:divide-x">
        {trustBar.map((t, i) => {
          const inner = (
            <>
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold/25 to-gold/5 text-ivory ring-1 ring-gold/40 transition-all duration-500 group-hover:scale-110 group-hover:ring-gold">
                <AnimatedIcon name={icons[i]} className="h-[22px] w-[22px]" delay={i * 0.12} accentColor="#D8C29B" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">{t.title}</span>
                <span className="mt-0.5 block text-[0.95rem] font-medium transition-colors group-hover:text-gold-light">{t.text}</span>
              </span>
            </>
          );
          return (
            <Reveal key={t.title} delay={i * 0.08} className="py-6 lg:px-8 lg:py-8">
              {t.href ? <a href={t.href} className="group flex items-center gap-4">{inner}</a> : <div className="group flex items-center gap-4">{inner}</div>}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
