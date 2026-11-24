import { MapPin, Phone, ShieldCheck, Zap } from "lucide-react";
import { trustBar } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

const icons = [MapPin, Phone, ShieldCheck, Zap];

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="relative bg-ink text-ivory">
      <div className="container grid max-w-[1400px] grid-cols-2 divide-ivory/10 lg:grid-cols-4 lg:divide-x">
        {trustBar.map((t, i) => {
          const I = icons[i];
          const inner = (
            <>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-light transition-colors group-hover:bg-gold group-hover:text-ink"><I className="h-[18px] w-[18px]" strokeWidth={1.5} /></span>
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">{t.title}</span>
                <span className="mt-0.5 block text-[0.95rem] font-medium">{t.text}</span>
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
