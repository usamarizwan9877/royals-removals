import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { logistics } from "@/content/site";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const heights = ["lg:mt-16", "", "lg:mt-24", "lg:mt-8"];

export default function LogisticsSection() {
  return (
    <section id="logistics" aria-labelledby="logistics-title" className="relative overflow-hidden bg-[#EFE6D5] py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHeader id="logistics-title" eyebrow={logistics.eyebrow} title={logistics.title} intro={logistics.intro} /></div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {logistics.cards.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.1} className="group rounded-[28px] bg-ivory-50 p-8 shadow-card transition-transform duration-500 hover:-translate-y-1">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold-light transition-transform duration-500 group-hover:rotate-6"><Icon name={c.icon} className="h-6 w-6" /></span>
                <h3 className="mt-7 font-display text-[1.6rem] font-light">{c.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/65">
                  {c.before}
                  <a href={c.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep">
                    {c.link.label}<ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  {c.after}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* original image strip */}
        <ul className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {logistics.strip.map((img, i) => (
            <Reveal as="li" key={img.src} delay={i * 0.08} className={heights[i]}>
              <figure className={`group relative overflow-hidden ${i % 2 ? "arch aspect-[3/4]" : "aspect-[4/5] rounded-[28px]"}`}>
                <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 24vw, 48vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                {"caption" in img && img.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-14 font-display text-lg font-light text-ivory sm:text-xl">{img.caption}</figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
