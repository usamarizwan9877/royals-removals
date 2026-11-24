import { why } from "@/content/site";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const roman = ["I", "II", "III", "IV", "V", "VI"];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#F6F1E8_1px,transparent_1px),linear-gradient(90deg,#F6F1E8_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container relative max-w-[1400px]">
        <SectionHeader id="why-title" eyebrow={why.eyebrow} title={why.title} intro={why.intro} dark align="center" />
        <ul className="mt-20 grid border-l border-t border-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.1} className="group relative border-b border-r border-ivory/10 p-8 transition-colors duration-500 hover:bg-ivory/[0.03] sm:p-10">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <span aria-hidden className="font-display text-3xl font-light italic text-ivory/15 transition-colors group-hover:text-gold/60">{roman[i]}</span>
              </div>
              <h3 className="mt-8 font-display text-[1.65rem] font-light">{item.title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/60">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
