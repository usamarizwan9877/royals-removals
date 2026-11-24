import Link from "next/link";
import { MapPin } from "lucide-react";
import { areas } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AreasSection() {
  const [hub, ...rest] = areas.items;
  return (
    <section id="areas" aria-labelledby="areas-title" className="relative overflow-hidden bg-ivory-100 py-24 sm:py-32">
      {/* map-inspired backdrop: contour rings radiating from Birmingham */}
      <svg aria-hidden className="pointer-events-none absolute -right-40 top-1/2 h-[900px] w-[900px] -translate-y-1/2 opacity-60" viewBox="0 0 900 900" fill="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="450" cy="450" r={50 + i * 48} stroke="#B08D57" strokeOpacity={0.35 - i * 0.03} strokeDasharray={i % 2 ? "2 8" : undefined} />
        ))}
        <path d="M120 600 C 260 520, 330 610, 450 450 S 700 260, 820 330" stroke="#0E1626" strokeOpacity=".12" strokeWidth="1.2" />
        <path d="M200 180 C 300 300, 380 330, 450 450 S 560 700, 640 800" stroke="#0E1626" strokeOpacity=".1" strokeWidth="1.2" />
      </svg>
      <div className="container relative grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader id="areas-title" eyebrow={areas.eyebrow} title={areas.title} intro={areas.intro} />
          <Reveal delay={0.15}>
            <Link href={hub.href} className="group mt-10 flex items-center justify-between overflow-hidden rounded-[28px] bg-ink p-7 text-ivory">
              <span className="flex items-center gap-4">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gold text-ink">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 motion-reduce:hidden" />
                  <MapPin className="relative h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-light">{hub.label}</span>
              </span>
              <span aria-hidden className="text-2xl text-gold-light transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal as="li" key={a.href} delay={(i % 6) * 0.04} y={14}>
                <Link href={a.href} className="group flex min-h-[56px] items-center justify-between gap-2 rounded-2xl border border-ink/10 bg-ivory-50/70 px-4 py-3 text-[0.93rem] font-medium backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-white hover:shadow-card">
                  <span>{a.label}</span>
                  <MapPin className="h-4 w-4 shrink-0 -translate-y-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" y={14}>
              <Link href={areas.viewAll.href} className="flex min-h-[56px] items-center justify-center rounded-2xl border border-dashed border-gold bg-gold/10 px-4 py-3 text-[0.93rem] font-semibold text-gold-deep transition-colors hover:bg-gold hover:text-ink">
                {areas.viewAll.label}
              </Link>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
