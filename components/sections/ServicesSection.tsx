import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

type Item = (typeof services.items)[number];
type Variant = "feature" | "split" | "arch" | "wide";

/* Bento composition — each card has a deliberate role, no two neighbours alike */
const layout: { v: Variant; cls: string }[] = [
  { v: "feature", cls: "lg:col-span-7 lg:row-span-2 min-h-[520px]" },
  { v: "split", cls: "lg:col-span-5" },
  { v: "split", cls: "lg:col-span-5" },
  { v: "arch", cls: "lg:col-span-4" },
  { v: "arch", cls: "lg:col-span-4" },
  { v: "arch", cls: "lg:col-span-4" },
  { v: "wide", cls: "lg:col-span-12" },
];

function More({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${light ? "text-gold-light" : "text-ink"}`}>
      <span className="relative">{services.cta}<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" /></span>
      <span className={`grid h-8 w-8 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45 ${light ? "bg-gold text-ink" : "bg-ink text-ivory"}`}><ArrowUpRight className="h-4 w-4" /></span>
    </span>
  );
}

function Card({ item, v, idx }: { item: Item; v: Variant; idx: number }) {
  const num = String(idx + 1).padStart(2, "0");
  if (v === "feature")
    return (
      <Link href={item.href} className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[32px] bg-ink p-8 text-ivory sm:p-10">
        <Image src={item.img.src} alt={item.img.alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover opacity-80 transition-transform duration-[1.6s] ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <span className="absolute right-8 top-8 font-display text-7xl font-light italic text-ivory/20">{num}</span>
        <div className="relative max-w-md">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold-light"><Icon name={item.icon} className="h-5 w-5" /></span>
          <h3 className="mt-6 font-display text-4xl font-light sm:text-5xl">{item.title}</h3>
          <p className="mt-4 text-ivory/75">{item.text}</p>
          <div className="mt-7"><More light /></div>
        </div>
      </Link>
    );
  if (v === "split")
    return (
      <Link href={item.href} className="group grid h-full overflow-hidden rounded-[32px] border border-ink/5 bg-white shadow-card transition-shadow duration-500 hover:shadow-soft sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[220px] overflow-hidden">
          <Image src={item.img.src} alt={item.img.alt} fill sizes="(min-width:1024px) 20vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
        </div>
        <div className="flex flex-col p-7">
          <div className="flex items-center justify-between"><Icon name={item.icon} className="h-6 w-6 text-gold-deep" /><span className="font-display italic text-ink/30">{num}</span></div>
          <h3 className="mt-5 font-display text-[1.7rem] font-light leading-tight">{item.title}</h3>
          <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink/65">{item.text}</p>
          <div className="mt-6"><More /></div>
        </div>
      </Link>
    );
  if (v === "arch")
    return (
      <Link href={item.href} className="group flex h-full flex-col rounded-[32px] bg-ivory-200/60 p-5 transition-colors duration-500 hover:bg-ivory-200">
        <div className="arch relative aspect-[5/4] overflow-hidden">
          <Image src={item.img.src} alt={item.img.alt} fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
          <span className="absolute left-1/2 top-5 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-ivory-50/90 text-gold-deep backdrop-blur"><Icon name={item.icon} className="h-5 w-5" /></span>
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
          <h3 className="font-display text-[1.6rem] font-light">{item.title}</h3>
          <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink/65">{item.text}</p>
          <div className="mt-6"><More /></div>
        </div>
      </Link>
    );
  return (
    <Link href={item.href} className="group relative grid overflow-hidden rounded-[32px] bg-ink text-ivory md:grid-cols-[1.2fr_1fr]">
      <div className="relative z-10 flex flex-col justify-center gap-5 p-8 sm:p-12">
        <span className="font-display text-sm italic text-gold-light">{num}</span>
        <h3 className="font-display text-4xl font-light">{item.title}</h3>
        <p className="max-w-lg text-ivory/70">{item.text}</p>
        <More light />
      </div>
      <div className="relative min-h-[260px] overflow-hidden">
        <Image src={item.img.src} alt={item.img.alt} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent" />
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-ivory-100 py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="services-title" eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
          <Reveal delay={0.1}>
            <Link href={services.viewAll.href} className="btn-ghost group shrink-0">
              {services.viewAll.label} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-5 lg:grid-cols-12">
          {services.items.map((item, i) => (
            <Reveal as="li" key={item.href} delay={(i % 3) * 0.08} className={layout[i].cls}>
              <Card item={item} v={layout[i].v} idx={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
