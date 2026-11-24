import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { contact, footer, logo } from "@/content/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import Reveal from "@/components/ui/Reveal";

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[0.95rem] text-ivory/65 transition-colors hover:text-gold-light">
      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
      {label}
    </Link>
  );
}

export default function Footer() {
  const social = [
    { href: contact.facebook, label: "Facebook", I: FacebookIcon },
    { href: contact.instagram, label: "Instagram", I: InstagramIcon },
    { href: contact.whatsappHref, label: "WhatsApp", I: WhatsAppIcon },
  ];
  const reach = [
    { href: contact.phoneHref, label: "Call us", value: contact.phoneDisplay, I: Phone, external: false },
    { href: contact.whatsappHref, label: "WhatsApp", value: contact.phoneDisplay, I: WhatsAppIcon, external: true },
    { href: `mailto:${contact.email}`, label: "Email us", value: contact.email, I: Mail, external: false },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0A101C] text-ivory">
      {/* soft gold glow + fine grid */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(246,241,232,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(246,241,232,.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container relative max-w-[1400px] pt-16">
        {/* quick contact tiles */}
        <ul className="grid gap-3 sm:grid-cols-3">
          {reach.map(({ href, label, value, I, external }) => (
            <li key={label}>
              <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex items-center gap-4 rounded-[22px] border border-ivory/10 bg-ivory/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-ivory/[0.06]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-12"><I className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.2em] text-ivory/45">{label}</span>
                  <span className="block truncate font-semibold text-ivory">{value}</span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-gold-light opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-14 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="The Royals Removals — Home" className="inline-block rounded-2xl bg-ivory-50 px-4 py-3 shadow-soft">
              <Image src={logo.src} alt={logo.alt} width={170} height={56} className="h-11 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-ivory/60">{footer.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {social.map(({ href, label, I }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink">
                    <I className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="eyebrow eyebrow-light">Services</h2>
            <ul className="mt-6 space-y-3">{footer.services.map((l) => <li key={l.href}><FooterLink {...l} /></li>)}</ul>
          </nav>
          <nav aria-label="Areas" className="lg:col-span-2">
            <h2 className="eyebrow eyebrow-light">Areas</h2>
            <ul className="mt-6 space-y-3">{footer.areas.map((l) => <li key={l.href}><FooterLink {...l} /></li>)}</ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow eyebrow-light">Contact</h2>
            <div className="mt-6 rounded-[24px] border border-ivory/10 bg-gradient-to-br from-ivory/[0.06] to-transparent p-6">
              <ul className="space-y-4 text-[0.95rem] text-ivory/70">
                <li className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" /><address className="not-italic">{contact.address}</address></li>
                <li className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
                  <Clock className="h-4 w-4 text-gold" />{contact.hours}
                </li>
              </ul>
              <Link href={footer.quote.href} className="btn-gold mt-6 w-full justify-center">{footer.quote.label}</Link>
            </div>
          </div>
        </div>

        {/* crown divider */}
        <div aria-hidden className="flex items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ivory/15" />
          <svg viewBox="0 0 24 16" className="h-4 w-6 text-gold"><path d="M2 14 0.5 3l6 4.5L12 0l5.5 7.5 6-4.5L22 14Z" fill="currentColor" /></svg>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ivory/15" />
        </div>

        <div className="flex flex-col gap-4 py-8 text-xs text-ivory/45 lg:flex-row lg:items-center lg:justify-between">
          <p className="whitespace-pre-wrap">{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <ul className="flex gap-6">{footer.legal.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-ivory">{l.label}</Link></li>)}</ul>
            <a href="#main" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold-light">
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* signature wordmark */}
      <Reveal y={40} className="relative mt-2 select-none overflow-hidden border-t border-ivory/10 pb-6 pt-10 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative flex flex-col items-center">
          <svg viewBox="0 0 48 30" aria-hidden className="footer-crown h-8 w-12 sm:h-11 sm:w-16">
            <path d="M5 26 2 7l11 8 11-13 11 13 11-8-3 19Z" fill="url(#crown-grad)" />
            <circle cx="24" cy="3" r="2.4" fill="#F3E6CB" /><circle cx="2" cy="7" r="2" fill="#F3E6CB" /><circle cx="46" cy="7" r="2" fill="#F3E6CB" />
            <defs><linearGradient id="crown-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E9D6B1" /><stop offset="1" stopColor="#8C6D3D" /></linearGradient></defs>
          </svg>
          <p aria-label="The Royals Removals" className="footer-wordmark mt-3 whitespace-nowrap text-center font-display font-light leading-[0.9] tracking-[-0.03em] text-[clamp(2.6rem,9.6vw,9.5rem)]">
            The Royals <span className="italic">Removals</span>
          </p>
          <span aria-hidden className="mt-5 flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-gold-light/70 sm:text-xs">
            <span className="h-px w-10 bg-gold/50 sm:w-20" />Birmingham · West Midlands<span className="h-px w-10 bg-gold/50 sm:w-20" />
          </span>
        </div>
      </Reveal>
    </footer>
  );
}
