"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Phone, Star } from "lucide-react";
import { callback, contact, finalCta, hero } from "@/content/site";
import CallbackForm from "@/components/ui/CallbackForm";
import Trustpilot from "@/components/ui/Trustpilot";
import RouteJourney from "@/components/ui/RouteJourney";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="cta" aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={finalCta.img.src} alt={finalCta.img.alt} fill sizes="100vw" className="object-cover opacity-45" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="container relative grid max-w-[1400px] items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal><SectionTitle id="cta-title" title={finalCta.title} className="!text-[clamp(2.8rem,7vw,6rem)] text-ivory" /></Reveal>
          <Reveal delay={0.1}><p className="mt-7 max-w-xl text-[1.08rem] leading-relaxed text-ivory/70">{finalCta.body}</p></Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <a href={finalCta.call.href} className="btn-gold"><Phone className="h-4 w-4" /> {finalCta.call.label}</a>
            <a href={finalCta.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost-light"><WhatsAppIcon className="h-[18px] w-[18px]" /> {finalCta.whatsapp.label}</a>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-6 text-sm text-ivory/75">
            {finalCta.badges.map((b) => <span key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold-light" />{b}</span>)}
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="rounded-[32px] border border-ivory/10 bg-ink/70 p-7 backdrop-blur-xl sm:p-9">
            <h3 className="mb-6 font-display text-[1.8rem] font-light">{callback.title}</h3>
            <CallbackForm variant="dark" finalLabel idPrefix="cta" />
            <div className="mt-6 grid gap-3 border-t border-ivory/10 pt-6">
              <Trustpilot theme="dark" />
              <a href={contact.googleReviews} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-ivory/80 hover:text-ivory">
                {hero.googleLabel} <span className="flex text-gold" aria-label="5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</span> {hero.googleRating}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="container relative mt-20 max-w-[1400px]"><RouteJourney tone="ivory" className="h-auto w-full opacity-70" /></div>
    </section>
  );
}
