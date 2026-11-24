"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Crown, FileText, ShieldCheck, Star, Zap } from "lucide-react";
import { callback, contact, hero, trustBar } from "@/content/site";
import CallbackForm from "@/components/ui/CallbackForm";
import Trustpilot from "@/components/ui/Trustpilot";
import RouteJourney from "@/components/ui/RouteJourney";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ease } from "@/components/ui/Reveal";

const line = { hidden: { y: "110%" }, show: (i: number) => ({ y: "0%", transition: { duration: 1.1, delay: 0.15 + i * 0.12, ease } }) };
const fade = { hidden: { opacity: 0, y: 18 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.55 + i * 0.08, ease } }) };

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="grain relative overflow-hidden bg-ivory-50 pb-10 pt-28 sm:pt-32 lg:pb-6 lg:pt-36">
      {/* soft architectural backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(216,194,155,.35),transparent_65%)]" />
        <div className="absolute inset-y-0 left-[58%] hidden w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent lg:block" />
      </div>

      <div className="container relative grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="lg:col-span-7 lg:pr-6">
          <motion.p initial="hidden" animate="show" custom={0} variants={fade} className="eyebrow !gap-2 before:!hidden">
            <Crown className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden /> {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-display font-light leading-[0.95] tracking-[-0.035em] text-ink">
            {[hero.h1.line1, hero.h1.highlight].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-[0.08em]">
                <motion.span initial="hidden" animate="show" custom={i} variants={line}
                  className={`block text-[clamp(3rem,9vw,7.4rem)] ${i === 1 ? "gold-word" : ""}`}>{t}</motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span initial="hidden" animate="show" custom={2} variants={line}
                className="mt-3 block font-sans text-[clamp(1rem,2vw,1.35rem)] font-semibold uppercase tracking-[0.22em] text-ink/70">
                {hero.h1.line3}
              </motion.span>
            </span>
          </h1>

          <motion.p initial="hidden" animate="show" custom={1} variants={fade} className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
            {hero.body}
          </motion.p>

          <motion.ul initial="hidden" animate="show" custom={2} variants={fade} className="mt-8 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
            {hero.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.92rem] text-ink/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/50 text-gold-deep"><Check className="h-3 w-3" /></span>
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div initial="hidden" animate="show" custom={3} variants={fade} className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={hero.ctaQuote.href} className="btn-ink group">
              <FileText className="h-4 w-4 text-gold-light" /> {hero.ctaQuote.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a href={hero.ctaWhatsApp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366] group-hover:text-ivory" /> {hero.ctaWhatsApp.label}
            </a>
          </motion.div>

          <motion.div initial="hidden" animate="show" custom={4} variants={fade} className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6">
            <a href={contact.googleReviews} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-card">
              <span className="font-semibold text-ink">{hero.googleLabel}</span>
              <span className="flex text-gold" aria-label="5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</span>
              <span className="text-sm text-ink/60">{hero.googleRating}</span>
            </a>
            <div className="w-full max-w-[260px] rounded-full bg-ink px-4 py-1"><Trustpilot theme="dark" /></div>
          </motion.div>
        </div>

        {/* Layered visual */}
        <div className="relative lg:col-span-5">
          <motion.div initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" }}
            transition={{ duration: 1.4, delay: 0.25, ease }}
            className="arch relative ml-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-ink shadow-soft">
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div aria-hidden className="absolute inset-3 rounded-[inherit] border border-ivory/30" />
          </motion.div>

          {/* floating trust indicators (from the original trust bar) */}
          <motion.div style={{ y: chipY }} className="pointer-events-none absolute -left-2 top-[16%] hidden sm:block lg:-left-14">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8, ease }}
              className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-gold-light"><ShieldCheck className="h-5 w-5" strokeWidth={1.5} /></span>
              <span><span className="block text-sm font-semibold">{trustBar[2].title}</span><span className="block text-xs text-ink/60">{trustBar[2].text}</span></span>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8, ease }}
            className="absolute right-3 top-6 hidden items-center gap-2.5 rounded-full bg-ink/85 px-4 py-2.5 text-ivory backdrop-blur sm:flex lg:-right-4">
            <Zap className="h-4 w-4 text-gold-light" /><span className="text-xs font-semibold">{trustBar[3].title} · {trustBar[3].text}</span>
          </motion.div>

          {/* call-back card */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }}
            className="relative z-10 mx-auto -mt-24 w-[92%] max-w-[400px] rounded-[28px] border border-ink/5 bg-ivory-50/95 p-6 shadow-soft backdrop-blur-xl sm:p-7 lg:absolute lg:-bottom-6 lg:-left-24 lg:mt-0 xl:-left-32">
            <h2 className="font-display text-2xl font-light">{callback.title}</h2>
            <p className="mb-5 mt-1 text-sm text-ink/60">{callback.subtitle}</p>
            <CallbackForm idPrefix="hero" />
          </motion.div>
        </div>
      </div>

      <div className="container relative mt-12 max-w-[1400px] lg:mt-16">
        <RouteJourney className="h-auto w-full opacity-90" />
      </div>
    </section>
  );
}
