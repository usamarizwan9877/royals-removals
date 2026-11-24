"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, ShieldCheck } from "lucide-react";
import { insurance } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

function Shield({ dark }: { dark?: boolean }) {
  const c = dark ? "#D8C29B" : "#B08D57";
  return (
    <motion.svg viewBox="0 0 80 92" className="h-20 w-[70px]" fill="none" aria-hidden initial="h" whileInView="s" viewport={{ once: true }}>
      <motion.path d="M40 4 L74 16 V44 C74 66 58 82 40 88 C22 82 6 66 6 44 V16 Z" stroke={c} strokeWidth="1.5"
        variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 1.6, ease: "easeInOut" } } }} />
      <motion.path d="M40 16 L62 24 V44 C62 58 52 69 40 74 C28 69 18 58 18 44 V24 Z" stroke={c} strokeOpacity=".45" strokeWidth="1"
        variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 1.6, delay: 0.3 } } }} />
      {dark ? (
        <motion.path d="M30 46 H50" stroke={c} strokeWidth="2" strokeLinecap="round" variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { delay: 1.2 } } }} />
      ) : (
        <motion.path d="M30 45 L37 52 L51 38" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { delay: 1.2, duration: 0.5 } } }} />
      )}
    </motion.svg>
  );
}

export default function InsuranceSection() {
  return (
    <section id="insurance" aria-labelledby="insurance-title" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <SectionHeader id="insurance-title" eyebrow={insurance.eyebrow} title={insurance.title} intro={insurance.intro} align="center" />
        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {insurance.cards.map((c, i) => {
            const dark = c.kind === "excluded";
            return (
              <Reveal as="li" key={c.title} delay={i * 0.1}
                className={`group relative overflow-hidden rounded-[32px] p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10 ${dark ? "bg-ink text-ivory" : "border border-ink/5 bg-white shadow-card"}`}>
                <div aria-hidden className={`absolute -right-16 -top-16 h-48 w-48 rounded-full ${dark ? "bg-gold/10" : "bg-gold/10"} blur-2xl transition-transform duration-700 group-hover:scale-150`} />
                <Shield dark={dark} />
                <h3 className="mt-8 font-display text-[1.75rem] font-light leading-tight">{c.title}</h3>
                <p className={`mt-4 text-[0.95rem] leading-relaxed ${dark ? "text-ivory/65" : "text-ink/65"}`}>{c.text}</p>
                <ul className={`mt-8 space-y-3 border-t pt-6 ${dark ? "border-ivory/10" : "border-ink/10"}`}>
                  {c.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[0.95rem]">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? "bg-ivory/10 text-gold-light" : "bg-gold/15 text-gold-deep"}`}>
                        {dark ? <Minus className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                      </span>
                      <span className={pt.includes("£") ? "font-semibold" : ""}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-ink/65">{insurance.outro}</p>
          <Link href={insurance.cta.href} className="btn-ink"><ShieldCheck className="h-4 w-4 text-gold-light" /> {insurance.cta.label}</Link>
        </Reveal>
      </div>
    </section>
  );
}
