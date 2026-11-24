"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navigation } from "@/content/site";

export default function DesktopNavigation() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navigation.map((item) => (
          <li key={item.href} className="relative"
            onMouseEnter={() => item.children && setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}>
            <div className="flex items-center">
              <Link href={item.href} className="group relative rounded-full px-4 py-2 text-[0.9rem] font-medium text-ink/80 transition-colors hover:text-ink">
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              {item.children && (
                <button type="button" aria-label={`${item.label} submenu`} aria-expanded={open === item.label}
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                  className="-ml-3 grid h-8 w-7 place-items-center text-ink/60">
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
            <AnimatePresence>
              {item.children && open === item.label && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3">
                  <ul className="overflow-hidden rounded-3xl border border-ink/5 bg-ivory-50 p-2 shadow-soft">
                    {item.children.map((c, i) => (
                      <motion.li key={c.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                        <Link href={c.href} className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 transition-colors hover:bg-ivory-200 hover:text-ink">
                          {c.label}
                          <span className="h-1.5 w-1.5 rounded-full bg-gold opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
}
