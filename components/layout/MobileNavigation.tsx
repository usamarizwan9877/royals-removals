"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { contact, headerCta, navigation } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export default function MobileNavigation({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, setOpen]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
        className="grid h-11 w-11 place-items-center rounded-full bg-ink text-ivory">
        <span className="flex w-4 flex-col gap-[5px]"><span className="h-px w-full bg-current" /><span className="h-px w-2/3 self-end bg-current" /></span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-6 pb-8 pt-6 text-ivory">
            <div className="flex items-center justify-between">
              <span className="eyebrow eyebrow-light">Menu</span>
              <button type="button" onClick={close} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Mobile" className="mt-10 flex-1">
              <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
                {navigation.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <div className="flex items-center justify-between">
                      <Link href={item.href} onClick={close} className="block py-4 font-display text-[2rem] font-light">{item.label}</Link>
                      {item.children && (
                        <button type="button" aria-expanded={sub === item.label} aria-label={`${item.label} submenu`}
                          onClick={() => setSub(sub === item.label ? null : item.label)} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/15">
                          <ChevronDown className={`h-5 w-5 transition-transform ${sub === item.label ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {item.children && sub === item.label && (
                        <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          {item.children.map((c) => (
                            <li key={c.href}><Link href={c.href} onClick={close} className="flex items-center gap-3 py-2.5 pl-1 text-lg text-ivory/70"><span className="h-px w-5 bg-gold" />{c.label}</Link></li>
                          ))}
                          <li className="h-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 grid gap-3">
              <Link href={headerCta.href} onClick={close} className="btn-gold w-full">{headerCta.label}</Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={contact.phoneHref} className="btn-ghost-light"><Phone className="h-4 w-4" />{contact.phoneDisplay}</a>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-light"><WhatsAppIcon className="h-4 w-4" />WhatsApp Us</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
