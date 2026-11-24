import { reviews } from "@/content/site";

/**
 * "Review us on Trustpilot" button.
 * Replaces the Trustpilot Review Collector iframe, which always renders as a fixed
 * white box and can't be styled to sit inside the site's pill badges.
 * Links to the same business unit's review form.
 */
export default function Trustpilot({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const dark = theme === "dark";
  return (
    <a
      href={reviews.trustpilot.reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 transition-shadow ${
        dark ? "border border-ivory/15 bg-ink text-ivory hover:border-ivory/30" : "bg-white text-ink shadow-card hover:shadow-soft"
      }`}
    >
      <span className={dark ? "text-ivory/75" : "text-ink/60"}>Review us on</span>
      <span className="flex items-center gap-1 font-semibold">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.15em] w-[1.15em] fill-[#00B67A]">
          <path d="M12 1.5l3.09 7.26 7.86.68-5.96 5.17 1.79 7.69L12 18.27 5.22 22.3l1.79-7.69L1.05 9.44l7.86-.68L12 1.5z" />
        </svg>
        Trustpilot
      </span>
    </a>
  );
}
