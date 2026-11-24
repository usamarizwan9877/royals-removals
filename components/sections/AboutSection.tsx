"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import { trustBar } from "@/content/site";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const ring = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} aria-labelledby="about-title" className="relative overflow-hidden bg-ivory-50 py-24 sm:py-32">
      <div className="container grid max-w-[1400px] items-center gap-14 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-5">
          {/* offset gold frame behind the photo */}
          <div aria-hidden className="arch absolute inset-0 translate-x-4 translate-y-4 border border-gold/50" />
          <div className="arch relative aspect-[4/5] overflow-hidden shadow-soft">
            <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
              <Image src={about.img.src} alt={about.img.alt} fill sizes="(min-width:1024px) 38vw, 92vw" className="object-cover" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}
            className="group absolute -left-4 top-12 flex items-center gap-3 rounded-2xl bg-ivory-50/95 px-4 py-3 shadow-soft backdrop-blur sm:-left-8">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-ivory"><AnimatedIcon name="shield" className="h-6 w-6" accentColor="#D8C29B" /></span>
            <span><span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink/50">{trustBar[2].title}</span><span className="block text-sm font-semibold">{trustBar[2].text}</span></span>
          </motion.div>
          {/* rotating seal */}
          <motion.svg style={{ rotate: ring }} viewBox="0 0 200 200" aria-hidden className="absolute -bottom-10 -right-6 h-36 w-36 sm:h-44 sm:w-44">
            <defs><path id="seal" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" /></defs>
            <circle cx="100" cy="100" r="96" fill="#0E1626" />
            <text fill="#D8C29B" fontSize="14.5" letterSpacing="5.2" fontWeight="600"><textPath href="#seal">THE ROYALS REMOVALS · BIRMINGHAM · WEST MIDLANDS ·</textPath></text>
            <circle cx="100" cy="100" r="44" fill="none" stroke="#B08D57" strokeOpacity=".35" />
            <path d="M78 114 L74 88 L88 99 L100 80 L112 99 L126 88 L122 114 Z" fill="#B08D57" />
            <path d="M78 121 H122" stroke="#B08D57" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="80" r="3" fill="#D8C29B" /><circle cx="74" cy="88" r="2.5" fill="#D8C29B" /><circle cx="126" cy="88" r="2.5" fill="#D8C29B" />
          </motion.svg>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-10">
          <Reveal><SectionTitle id="about-title" title={about.title} className="text-ink" /></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[1.08rem] leading-[1.85] text-ink/70 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-gold">
              {about.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}><Link href={about.cta.href} className="btn-ink mt-10">{about.cta.label} <span aria-hidden>→</span></Link></Reveal>
        </div>
      </div>
    </section>
  );
}
