"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, faq } from "@/content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Plus that morphs into a minus when open. */
function Toggle({ open }: { open: boolean }) {
  return (
    <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${open ? "border-ink bg-ink text-gold-light" : "border-ink/15 group-hover:border-gold group-hover:text-gold-deep"}`}>
      <span className="absolute h-[1.5px] w-4 rounded-full bg-current" />
      <motion.span className="absolute h-4 w-[1.5px] rounded-full bg-current" animate={{ scaleY: open ? 0 : 1, rotate: open ? 90 : 0 }} transition={{ duration: 0.35 }} />
    </span>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" aria-labelledby="faq-title" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="container grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
            {/* still-have-questions card */}
            <Reveal delay={0.15} className="group mt-10 overflow-hidden rounded-[28px] bg-ink p-7 text-ivory shadow-soft">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-gold/40">
                <AnimatedIcon name="phone" className="h-7 w-7" accentColor="#D8C29B" />
              </span>
              <p className="mt-5 font-display text-2xl font-light">Still have questions?</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={contact.phoneHref} className="btn-gold">{contact.phoneDisplay}</a>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                  className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:bg-gold hover:text-ink">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-8">
          {faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.05} y={16}
                className={`relative overflow-hidden rounded-[24px] border transition-all duration-500 ${isOpen ? "border-gold/40 bg-white shadow-card" : "border-ink/10 bg-transparent hover:border-ink/20 hover:bg-white/60"}`}>
                <span aria-hidden className={`absolute bottom-0 left-0 top-0 w-1 origin-top bg-gradient-to-b from-gold-light to-gold-deep transition-transform duration-500 ${isOpen ? "scale-y-100" : "scale-y-0"}`} />
                <h3>
                  <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 px-6 py-6 text-left sm:px-8">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm italic transition-colors duration-500 ${isOpen ? "bg-gold text-ink" : "bg-gold/10 text-gold-deep"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-[1.25rem] font-light leading-snug text-ink transition-colors group-hover:text-gold-deep sm:text-[1.45rem]">{f.q}</span>
                    <Toggle open={isOpen} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} key="a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <motion.p initial={{ y: -8 }} animate={{ y: 0 }} transition={{ duration: 0.45 }}
                        className="max-w-2xl px-6 pb-7 text-[1rem] leading-relaxed text-ink/65 sm:pl-[5.25rem] sm:pr-8">
                        {f.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
