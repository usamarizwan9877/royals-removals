"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { logistics } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/** Custom duotone marks for the two logistics cards. */
function ParkingMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden>
      <rect x="7" y="4" width="22" height="22" rx="5" fill="#B08D57" />
      <path d="M14.5 21V9.5h5a3.7 3.7 0 0 1 0 7.4h-5" stroke="#0E1626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 26v10" stroke="#D8C29B" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 33.5h8M30 29.5v8" stroke="#D8C29B" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}
function CleanAirMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden>
      <path d="M9 31C9 16 19 7 33 7c0 14-9 24-24 24Z" fill="#B08D57" />
      <path d="M9 31C15 23 21 18 27 14" stroke="#0E1626" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 22h7M3 27h5M5 17h4" stroke="#D8C29B" strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}
const MARKS = { parking: ParkingMark, leaf: CleanAirMark } as const;

export default function LogisticsSection() {
  const strip = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: strip, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const down = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  return (
    <section id="logistics" aria-labelledby="logistics-title" className="relative overflow-hidden bg-[#EFE6D5] py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5"><SectionHeader id="logistics-title" eyebrow={logistics.eyebrow} title={logistics.title} intro={logistics.intro} /></div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {logistics.cards.map((c, i) => {
              const Mark = MARKS[c.icon as keyof typeof MARKS];
              return (
                <Reveal as="li" key={c.title} delay={i * 0.12}
                  className="group relative flex flex-col overflow-hidden rounded-[30px] border border-ink/5 bg-ivory-50 p-8 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                  {/* gold rule that draws across on hover */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-light via-gold to-gold-deep transition-transform duration-700 group-hover:scale-x-100" />
                  <span aria-hidden className="absolute right-7 top-6 font-display text-[4.5rem] font-light italic leading-none text-ink/[0.07] transition-colors duration-500 group-hover:text-gold/30">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink shadow-card transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"><Mark /></span>
                  <h3 className="mt-7 font-display text-[1.6rem] font-light leading-snug">{c.title}</h3>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/65">
                    {c.before}
                    <a href={c.link.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep">
                      {c.link.label}
                    </a>
                    {c.after}
                  </p>
                  <a href={c.link.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden
                    className="mt-6 inline-flex h-10 w-10 items-center justify-center self-start rounded-full border border-ink/10 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold">
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* image strip with gentle parallax */}
        <ul ref={strip} className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {logistics.strip.map((img, i) => (
            <motion.li key={img.src} style={{ y: i % 2 ? up : down }} className="lg:[&:nth-child(even)]:mt-12">
              <Reveal delay={i * 0.08}>
                <figure className={`group relative overflow-hidden shadow-card ${i % 2 ? "arch aspect-[3/4]" : "aspect-[3/4] rounded-[30px]"}`}>
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 24vw, 48vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                  {"caption" in img && img.caption && (
                    <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-ivory/15 bg-ink/45 px-4 py-3 font-display text-lg font-light text-ivory backdrop-blur-md sm:text-xl">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
