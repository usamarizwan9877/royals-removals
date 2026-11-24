"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { callback, contact, hero, trustBar } from "@/content/site";
import CallbackForm from "@/components/ui/CallbackForm";
import Trustpilot from "@/components/ui/Trustpilot";
import RouteJourney from "@/components/ui/RouteJourney";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import AnimatedStars from "@/components/ui/AnimatedStars";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ease } from "@/components/ui/Reveal";

const fade = { hidden: { opacity: 0, y: 18 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.55 + i * 0.08, ease } }) };

/* Gold specks drifting up the background (fixed positions so SSR matches). */
const SPECKS = [
  { x: 6, y: 78, s: 4, d: 0, t: 11 }, { x: 14, y: 30, s: 3, d: 2.5, t: 13 }, { x: 24, y: 88, s: 5, d: 1.2, t: 12 },
  { x: 38, y: 12, s: 3, d: 4, t: 14 }, { x: 47, y: 64, s: 4, d: 0.6, t: 10 }, { x: 55, y: 22, s: 3, d: 3.1, t: 15 },
  { x: 63, y: 84, s: 5, d: 1.8, t: 12 }, { x: 72, y: 40, s: 3, d: 5, t: 13 }, { x: 81, y: 70, s: 4, d: 2.2, t: 11 },
  { x: 90, y: 18, s: 3, d: 0.4, t: 14 }, { x: 96, y: 56, s: 4, d: 3.6, t: 12 },
];

/** Word-by-word / letter-by-letter rise for the headline. */
function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block ${className ?? ""}`} aria-hidden>
      {text.split(" ").map((word, w, words) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, c) => {
            const i = words.slice(0, w).join("").length + c;
            return (
              <span key={c} className="-mx-[0.08em] -mt-[0.2em] inline-block overflow-hidden px-[0.08em] pb-[0.1em] pt-[0.2em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%", rotate: 8 }} animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 0.9, delay: delay + i * 0.035, ease }}>
                  {ch}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block w-[0.22em]" />}
        </span>
      ))}
    </span>
  );
}

/** Floating info chip with an animated icon and a gentle idle bob. */
function Chip({ icon, title, text, className, delay, bob = 6, dark = false }: { icon: string; title: string; text: string; className: string; delay: number; bob?: number; dark?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay, duration: 0.8, ease }}
      className={`pointer-events-auto absolute ${className}`}>
      <motion.div animate={{ y: [0, -bob, 0] }} transition={{ duration: 4 + bob / 3, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft backdrop-blur ${dark ? "bg-ink/90 text-ivory" : "bg-white/90 text-ink"}`}>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${dark ? "bg-gold/20 text-ivory ring-1 ring-gold/40" : "bg-ink text-ivory"}`}>
          <AnimatedIcon name={icon} className="h-5 w-5" delay={delay} accentColor="#D8C29B" />
        </span>
        <span>
          <span className="block text-sm font-semibold">{title}</span>
          <span className={`block text-xs ${dark ? "text-ivory/60" : "text-ink/60"}`}>{text}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);

  // pointer parallax (−0.5…0.5), smoothed
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const chipX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const chipY = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["10%", "70%"]);
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" onMouseMove={onMove}
      className="grain relative overflow-hidden bg-ivory-50 pb-10 pt-28 sm:pt-32 lg:pb-6 lg:pt-36">
      {/* animated backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div style={{ left: glowX, top: glowY }} className="absolute h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,194,155,.38),transparent_65%)]" />
        <div className="absolute inset-y-0 left-[58%] hidden w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent lg:block" />
        {/* slowly turning rings behind the photo */}
        <svg viewBox="0 0 600 600" className="hero-spin absolute -right-48 top-10 hidden h-[760px] w-[760px] opacity-50 lg:block" fill="none">
          <circle cx="300" cy="300" r="290" stroke="#B08D57" strokeOpacity=".25" strokeDasharray="2 10" />
          <circle cx="300" cy="300" r="240" stroke="#B08D57" strokeOpacity=".18" />
          <circle cx="300" cy="10" r="5" fill="#B08D57" />
          <circle cx="60" cy="300" r="3" fill="#B08D57" fillOpacity=".6" />
        </svg>
        {SPECKS.map((p, i) => (
          <span key={i} className="hero-speck absolute rounded-full bg-gold"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }} />
        ))}
      </div>

      <div className="container relative grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="lg:col-span-7 lg:pr-6">
          <motion.p initial="hidden" animate="show" custom={0} variants={fade} className="eyebrow group !gap-2 before:!hidden">
            <span className="text-ink"><AnimatedIcon name="crown" className="h-5 w-5" /></span> {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-display font-light leading-[0.95] tracking-[-0.035em] text-ink">
            <span className="sr-only">{hero.h1.line1} {hero.h1.highlight} {hero.h1.line3}</span>
            <Letters text={hero.h1.line1} delay={0.15} className="text-[clamp(2.6rem,8.6vw,7rem)]" />
            <span className="relative inline-block">
              <Letters text={hero.h1.highlight} delay={0.45} className="gold-word text-[clamp(2.6rem,8.6vw,7rem)] sm:whitespace-nowrap" />
              <span aria-hidden className="hero-text-sheen pointer-events-none absolute inset-0" />
              {/* hand-drawn underline */}
              <motion.svg viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden className="absolute -bottom-1 left-0 h-4 w-full text-gold" fill="none">
                <motion.path d="M4 16 C 120 4, 260 22, 380 10 S 560 8, 596 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 1.1, ease: "easeInOut" }} />
              </motion.svg>
            </span>
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 1.1, ease }} aria-hidden
                className="mt-4 block font-sans text-[clamp(1rem,2vw,1.35rem)] font-semibold uppercase tracking-[0.22em] text-ink/70">
                {hero.h1.line3}
              </motion.span>
            </span>
          </h1>

          <motion.p initial="hidden" animate="show" custom={1} variants={fade} className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
            {hero.body}
          </motion.p>

          <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-3 sm:grid-cols-2">
            {hero.points.map((p, i) => (
              <motion.li key={p} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease }}
                className="flex items-start gap-3 text-[0.92rem] text-ink/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/50">
                  <svg viewBox="0 0 12 12" className="h-3 w-3 text-gold-deep" fill="none" aria-hidden>
                    <motion.path d="M2.5 6.3 5 8.6 9.5 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 + i * 0.12, duration: 0.45 }} />
                  </svg>
                </span>
                {p}
              </motion.li>
            ))}
          </ul>

          <motion.div initial="hidden" animate="show" custom={3} variants={fade} className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={hero.ctaQuote.href} className="btn-ink btn-shine group">
              <FileText className="h-4 w-4 text-gold-light" /> {hero.ctaQuote.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a href={hero.ctaWhatsApp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
              <span className="relative grid place-items-center">
                <span aria-hidden className="absolute h-7 w-7 animate-ping rounded-full bg-[#25D366]/25 motion-reduce:hidden" />
                <WhatsAppIcon className="relative h-[18px] w-[18px] text-[#25D366] group-hover:text-ivory" />
              </span>
              {hero.ctaWhatsApp.label}
            </a>
          </motion.div>

          <motion.div initial="hidden" animate="show" custom={4} variants={fade} className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6">
            <a href={contact.googleReviews} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-full bg-white px-4 py-2.5 shadow-card transition-transform duration-300 hover:-translate-y-0.5">
              <span className="font-semibold text-ink">{hero.googleLabel}</span>
              <AnimatedStars className="h-3.5 w-3.5" />
              <span className="text-sm text-ink/60">{hero.googleRating}</span>
            </a>
            <Trustpilot theme="light" />
          </motion.div>
        </div>

        {/* Layered visual */}
        <div className="relative lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="relative ml-auto w-full max-w-[520px]">
            {/* orbiting dot around the arch */}
            <svg aria-hidden viewBox="0 0 520 650" className="pointer-events-none absolute -inset-5 z-10 hidden h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] sm:block" fill="none" preserveAspectRatio="none">
              <path id="arch-orbit" d="M10 640 V260 A250 250 0 0 1 510 260 V640" stroke="#B08D57" strokeOpacity=".35" strokeDasharray="3 9" />
              <circle r="5" fill="#B08D57">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear">
                  <mpath href="#arch-orbit" />
                </animateMotion>
              </circle>
            </svg>
            <motion.div initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" }}
              transition={{ duration: 1.4, delay: 0.25, ease }}
              className="arch relative aspect-[4/5] w-full overflow-hidden bg-ink shadow-soft">
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div aria-hidden className="hero-sheen absolute inset-0" />
              <div aria-hidden className="absolute inset-3 rounded-[inherit] border border-ivory/30" />
            </motion.div>
          </motion.div>

          {/* floating trust chips (copy from the original trust bar), drifting against the pointer */}
          <motion.div style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
            <Chip icon="shield" title={trustBar[2].title} text={trustBar[2].text} className="-left-2 top-[16%] lg:-left-14" delay={1.2} />
            <Chip icon="stopwatch" title={trustBar[3].title} text={trustBar[3].text} className="right-3 top-4 lg:-right-4" delay={1.4} bob={5} dark />
            <Chip icon="pin" title={trustBar[0].title} text={trustBar[0].text} className="-right-2 top-[52%] hidden lg:block xl:-right-8" delay={1.6} bob={8} />
          </motion.div>

          {/* call-back card */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }}
            className="relative z-30 mx-auto -mt-24 w-[92%] max-w-[400px] rounded-[28px] border border-ink/5 bg-ivory-50/95 p-6 shadow-soft backdrop-blur-xl sm:p-7 lg:absolute lg:-bottom-6 lg:-left-24 lg:mt-0 xl:-left-32">
            <span aria-hidden className="absolute -top-3 right-6 flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory">
              <span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>
              {contact.hours}
            </span>
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
