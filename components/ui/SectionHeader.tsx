import type { Title } from "@/content/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type Props = { eyebrow?: string; title: Title; intro?: string; align?: "left" | "center"; dark?: boolean; id?: string; className?: string };

export default function SectionHeader({ eyebrow, title, intro, align = "left", dark = false, id, className = "" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-light" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <SectionTitle id={id} title={title} className={`mt-5 ${dark ? "text-ivory" : "text-ink"}`} />
      {intro && <p className={`mt-6 text-[1.05rem] leading-relaxed ${dark ? "text-ivory/65" : "text-ink/65"} ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</p>}
    </Reveal>
  );
}
