import type { Title } from "@/content/site";

type Props = { title: Title; as?: "h1" | "h2" | "h3"; className?: string; id?: string };

/** Renders an original heading, reproducing its gold-highlighted words. */
export default function SectionTitle({ title, as: Tag = "h2", className = "", id }: Props) {
  return (
    <Tag id={id} className={`h-section ${className}`}>
      {title.pre}
      {title.breakBeforeGold && <br className="hidden md:block" />}
      <span className="gold-word">{title.gold}</span>
      {title.post}
    </Tag>
  );
}
