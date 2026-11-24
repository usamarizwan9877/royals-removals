"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { areas } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/*
 * Coverage map: Birmingham at the centre with a route to every area we serve
 * (approximate real-world bearings, not to scale). Hovering or focusing an area
 * in the list highlights its route on the map, and vice versa.
 */
const SPOTS: Record<string, [number, number]> = {
  dudley: [-13, -2], sandwell: [-7, -4], walsall: [-6, -14], wolverhampton: [-20, -12],
  solihull: [12, 6], coventry: [30, 4], lichfield: [5, -26], redditch: [-2, 23],
  bromsgrove: [-9, 18], wythall: [1, 13], walmley: [9, -9], "four-oaks": [5, -15],
  hollywood: [-3, 11], boldmere: [4, -9], "barnt-green": [-5, 17], "droitwich-spa": [-15, 27],
  alcester: [5, 30], tamworth: [19, -20], cannock: [-12, -25], "royal-leamington-spa": [33, 21],
  nuneaton: [30, -13],
};
const CX = 200, CY = 165, K = 5.2; // map centre (Birmingham) and km→px scale
const slugOf = (href: string) => href.split("/").filter(Boolean).pop() ?? "";
const pt = (slug: string) => {
  const [x, y] = SPOTS[slug] ?? [0, 0];
  return { x: CX + x * K, y: CY + y * K };
};

export default function AreasSection() {
  const [hub, ...rest] = areas.items;
  const [active, setActive] = useState<string | null>(null);
  const activeLabel = rest.find((a) => slugOf(a.href) === active)?.label;

  return (
    <section id="areas" aria-labelledby="areas-title" className="relative overflow-hidden bg-ivory-100 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-gold/10 blur-3xl" />
      <div className="container relative grid max-w-[1400px] gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <SectionHeader id="areas-title" eyebrow={areas.eyebrow} title={areas.title} intro={areas.intro} />
        </div>

        {/* coverage map card — stretches to match the area list height */}
        <div className="flex lg:col-span-5">
          <Reveal delay={0.15} className="flex w-full flex-col overflow-hidden rounded-[32px] bg-ink text-ivory shadow-soft">
            <div className="relative min-h-[300px] flex-1">
              <motion.svg viewBox="0 0 400 330" className="absolute inset-0 block h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <defs>
                  <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#B08D57" stopOpacity=".28" />
                    <stop offset="1" stopColor="#B08D57" stopOpacity="0" />
                  </radialGradient>
                  <pattern id="map-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                    <path d="M22 0H0V22" fill="none" stroke="#F6F1E8" strokeOpacity=".05" />
                  </pattern>
                </defs>
                <rect width="400" height="330" fill="url(#map-grid)" />
                <circle cx={CX} cy={CY} r="150" fill="url(#map-glow)" />
                {[40, 85, 130].map((r) => (
                  <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="#D8C29B" strokeOpacity=".14" strokeDasharray="2 6" />
                ))}

                {/* routes */}
                {rest.map((a, i) => {
                  const s = slugOf(a.href), p = pt(s), on = active === s;
                  const mx = (CX + p.x) / 2 + (p.y - CY) * 0.12, my = (CY + p.y) / 2 - (p.x - CX) * 0.12;
                  return (
                    <motion.path key={s} d={`M${CX} ${CY} Q${mx} ${my} ${p.x} ${p.y}`} fill="none"
                      stroke={on ? "#D8C29B" : "#F6F1E8"} strokeWidth={on ? 1.8 : 0.8} strokeOpacity={on ? 1 : active ? 0.08 : 0.22}
                      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, delay: 0.3 + i * 0.05, ease: "easeOut" } } }}
                      style={{ transition: "stroke .3s, stroke-opacity .3s, stroke-width .3s" }} />
                  );
                })}

                {/* area dots */}
                {rest.map((a, i) => {
                  const s = slugOf(a.href), p = pt(s), on = active === s;
                  return (
                    <motion.g key={s} style={{ originX: 0.5, originY: 0.5 }}
                      variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { delay: 0.8 + i * 0.05, type: "spring", stiffness: 300, damping: 18 } } }}>
                      {on && <circle cx={p.x} cy={p.y} r="10" fill="#B08D57" fillOpacity=".25" />}
                      <circle cx={p.x} cy={p.y} r={on ? 4.5 : 3} fill={on ? "#D8C29B" : "#B08D57"} stroke="#0E1626" strokeWidth="1.2" style={{ transition: "r .25s" }} />
                    </motion.g>
                  );
                })}

                {/* Birmingham hub */}
                <circle cx={CX} cy={CY} r="9" fill="#B08D57" className="map-ping" />
                <circle cx={CX} cy={CY} r="9" fill="#B08D57" stroke="#0E1626" strokeWidth="2" />
                <path d={`M${CX - 4.5} ${CY + 2.5} l-1-5.5 3 2 2.5-4 2.5 4 3-2 -1 5.5z`} fill="#0E1626" />
              </motion.svg>

              {/* active area label */}
              <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-ivory/10 bg-ink/80 px-4 py-2 text-sm backdrop-blur">
                <span className="text-ivory/50">{hub.label}</span>
                {activeLabel && <span className="text-gold-light"> → {activeLabel}</span>}
              </div>
            </div>

            <Link href={hub.href} className="group flex items-center justify-between border-t border-ivory/10 px-7 py-5 transition-colors hover:bg-ivory/[0.04]">
              <span className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink"><MapPin className="h-5 w-5" /></span>
                <span className="font-display text-[1.9rem] font-light">{hub.label}</span>
              </span>
              <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 text-gold-light transition-all duration-500 group-hover:translate-x-1 group-hover:border-gold">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid h-full auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3" onMouseLeave={() => setActive(null)}>
            {rest.map((a, i) => {
              const s = slugOf(a.href);
              return (
                <Reveal as="li" key={a.href} delay={(i % 6) * 0.04} y={14}>
                  <Link href={a.href} onMouseEnter={() => setActive(s)} onFocus={() => setActive(s)} onBlur={() => setActive(null)}
                    className={`group flex h-full min-h-[64px] items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-[0.93rem] font-medium transition-all duration-300 ${
                      active === s ? "-translate-y-0.5 border-gold bg-white shadow-card" : "border-ink/10 bg-ivory-50/80 hover:border-gold"
                    }`}>
                    <span className="flex items-center gap-2.5">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${active === s ? "bg-gold" : "bg-ink/20"}`} />
                      {a.label}
                    </span>
                    <ArrowUpRight className={`h-4 w-4 shrink-0 text-gold transition-all duration-300 ${active === s ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
                  </Link>
                </Reveal>
              );
            })}
            <Reveal as="li" y={14}>
              <Link href={areas.viewAll.href} className="flex h-full min-h-[64px] items-center justify-center rounded-2xl bg-ink px-4 py-3 text-[0.93rem] font-semibold text-gold-light transition-colors hover:bg-gold hover:text-ink">
                {areas.viewAll.label}
              </Link>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
