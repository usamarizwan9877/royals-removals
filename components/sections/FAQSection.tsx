"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/content/site";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" aria-labelledby="faq-title" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="container grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4"><div className="lg:sticky lg:top-32"><SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} /></div></div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
          {faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-6 py-7 text-left">
                    <span className="font-display text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-[1.3rem] font-light leading-snug text-ink transition-colors group-hover:text-gold-deep sm:text-[1.55rem]">{f.q}</span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? "rotate-45 border-ink bg-ink text-gold-light" : "border-ink/15"}`}><Plus className="h-4 w-4" /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} key="a"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="max-w-2xl pb-8 pl-0 text-[1rem] leading-relaxed text-ink/65 sm:pl-12">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
