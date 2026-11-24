import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contact, footer, logo } from "@/content/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  const social = [
    { href: contact.facebook, label: "Facebook", I: FacebookIcon },
    { href: contact.instagram, label: "Instagram", I: InstagramIcon },
    { href: contact.whatsappHref, label: "WhatsApp", I: WhatsAppIcon },
  ];
  return (
    <footer className="relative overflow-hidden bg-[#0A101C] pt-20 text-ivory">
      <div className="container max-w-[1400px]">
        <div className="grid gap-14 border-b border-ivory/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="The Royals Removals — Home" className="inline-block rounded-2xl bg-ivory-50 px-4 py-3">
              <Image src={logo.src} alt={logo.alt} width={170} height={56} className="h-11 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-ivory/60">{footer.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {social.map(({ href, label, I }) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 transition-colors hover:border-gold hover:bg-gold hover:text-ink"><I className="h-4 w-4" /></a></li>
              ))}
            </ul>
          </div>
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="eyebrow eyebrow-light">Services</h2>
            <ul className="mt-6 space-y-3">{footer.services.map((l) => <li key={l.href}><Link href={l.href} className="text-[0.95rem] text-ivory/65 transition-colors hover:text-gold-light">{l.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Areas" className="lg:col-span-2">
            <h2 className="eyebrow eyebrow-light">Areas</h2>
            <ul className="mt-6 space-y-3">{footer.areas.map((l) => <li key={l.href}><Link href={l.href} className="text-[0.95rem] text-ivory/65 transition-colors hover:text-gold-light">{l.label}</Link></li>)}</ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="eyebrow eyebrow-light">Contact</h2>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-ivory/70">
              <li><a href={contact.phoneHref} className="flex items-center gap-3 hover:text-gold-light"><Phone className="h-4 w-4 text-gold" />{contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all hover:text-gold-light"><Mail className="h-4 w-4 shrink-0 text-gold" />{contact.email}</a></li>
              <li className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" /><address className="not-italic">{contact.address}</address></li>
              <li className="flex items-center gap-3"><Clock className="h-4 w-4 text-gold" />{contact.hours}</li>
            </ul>
            <Link href={footer.quote.href} className="btn-gold mt-8">{footer.quote.label}</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8 text-xs text-ivory/45 lg:flex-row lg:items-center lg:justify-between">
          <p className="whitespace-pre-wrap">{footer.copyright}</p>
          <ul className="flex gap-6">{footer.legal.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-ivory">{l.label}</Link></li>)}</ul>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] font-light italic leading-[0.8] text-ivory/[0.035]">The Royals</p>
    </footer>
  );
}
