"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone } from "lucide-react";
import { contact, headerCta, logo } from "@/content/site";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > 600 && y > prev && !mobileOpen);
  });
  useEffect(() => setSolid(window.scrollY > 24), []);

  return (
    <motion.header
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div className={`mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-4 rounded-full pl-5 pr-2.5 transition-all duration-500 ${
        solid ? "border border-ink/5 bg-ivory-50/85 shadow-card backdrop-blur-xl" : "border border-transparent bg-transparent"}`}>
        <Link href="/" aria-label="The Royals Removals — Home" className="relative flex shrink-0 items-center">
          <Image src={logo.src} alt={logo.alt} width={170} height={56} priority className="h-10 w-auto sm:h-11" />
        </Link>
        <DesktopNavigation />
        <div className="flex items-center gap-2">
          <a href={contact.phoneHref} className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:text-gold-deep xl:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-gold-light"><Phone className="h-3.5 w-3.5" /></span>
            {contact.phoneDisplay}
          </a>
          <a href={contact.phoneHref} aria-label={`Call ${contact.phoneDisplay}`} className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink xl:hidden">
            <Phone className="h-4 w-4" />
          </a>
          <Link href={headerCta.href} className="btn-ink hidden !min-h-[48px] !px-6 sm:inline-flex">
            <span className="relative z-10">{headerCta.label}</span>
          </Link>
          <MobileNavigation open={mobileOpen} setOpen={setMobileOpen} />
        </div>
      </div>
    </motion.header>
  );
}
