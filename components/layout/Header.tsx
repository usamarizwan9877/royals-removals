"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import { contact, headerCta, logo } from "@/content/site";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
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
      <div className={`relative mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-4 rounded-full pl-5 pr-2.5 transition-all duration-500 ${
        solid ? "border border-ink/5 bg-ivory-50/85 shadow-card backdrop-blur-xl" : "border border-transparent bg-transparent"}`}>
        {/* reading progress along the bottom edge */}
        <motion.span aria-hidden style={{ scaleX: progress, opacity: solid ? 1 : 0 }} className="absolute inset-x-6 bottom-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-deep transition-opacity" />
        <Link href="/" aria-label="The Royals Removals — Home" className="group relative flex shrink-0 items-center">
          <Image src={logo.src} alt={logo.alt} width={170} height={56} priority className="h-10 w-auto transition-transform duration-500 group-hover:scale-105 sm:h-11" />
        </Link>
        <DesktopNavigation />
        <div className="flex items-center gap-2">
          <a href={contact.phoneHref} className="group hidden items-center gap-2.5 rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-gold-deep xl:flex">
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-ink text-ivory">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2.4s] motion-reduce:hidden" />
              <AnimatedIcon name="phone" className="relative h-[18px] w-[18px]" accentColor="#D8C29B" />
            </span>
            {contact.phoneDisplay}
          </a>
          <a href={contact.phoneHref} aria-label={`Call ${contact.phoneDisplay}`} className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink xl:hidden">
            <Phone className="h-4 w-4" />
          </a>
          <Link href={headerCta.href} className="btn-ink btn-shine group hidden !min-h-[48px] !px-6 sm:inline-flex">
            <span className="relative z-10">{headerCta.label}</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 text-gold-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <MobileNavigation open={mobileOpen} setOpen={setMobileOpen} />
        </div>
      </div>
    </motion.header>
  );
}
