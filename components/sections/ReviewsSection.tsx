import { ArrowUpRight, Star } from "lucide-react";
import { contact, hero, reviews } from "@/content/site";
import { getGoogleReviews, type GoogleReview } from "@/lib/googleReviews";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedStars from "@/components/ui/AnimatedStars";
import Reveal from "@/components/ui/Reveal";

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  const n = Math.round(value);
  return (
    <span className="flex text-gold" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < n ? "fill-current" : "opacity-30"}`} />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.author.trim().charAt(0).toUpperCase();
  return (
    <figure className="flex h-full flex-col rounded-[28px] border border-ink/5 bg-white p-7 shadow-card">
      <Stars value={review.rating} />
      <blockquote className="mt-5 line-clamp-[8] flex-1 text-[0.98rem] leading-relaxed text-ink/75">“{review.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {review.authorPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.authorPhoto} alt="" width={40} height={40} referrerPolicy="no-referrer" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory-200 font-semibold text-ink/70">{initial}</span>
        )}
        <span className="min-w-0">
          {review.authorUrl ? (
            <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="block truncate font-semibold text-ink hover:text-gold-deep">{review.author}</a>
          ) : (
            <span className="block truncate font-semibold text-ink">{review.author}</span>
          )}
          <span className="block text-sm text-ink/50">{review.when} · Google</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Live reviews only — Google reviews fetched server-side (lib/googleReviews.ts) plus Trustpilot. No hard-coded testimonials. */
export default async function ReviewsSection() {
  const google = await getGoogleReviews();
  const rating = google?.rating ? `${google.rating.toFixed(1)} Rating` : hero.googleRating;
  const googleHref = google?.mapsUrl ?? contact.googleReviews;

  return (
    <section id="testimonials" aria-labelledby="reviews-title" className="relative bg-ivory-50 py-24 sm:py-32">
      <div className="container max-w-[1400px]">
        <SectionHeader id="reviews-title" eyebrow={reviews.eyebrow} title={reviews.title} align="center" />
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-[1.15fr_1fr]">
          {/* Google rating card */}
          <Reveal delay={0.1}>
            <a href={googleHref} target="_blank" rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-ink/5 bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:p-10">
              <span aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <span className="relative text-xs font-semibold uppercase tracking-[0.22em] text-ink/50">{hero.googleLabel}</span>
              <span className="relative mt-4 flex items-end gap-4">
                <span className="font-display text-[4.5rem] font-light leading-none">{(google?.rating ?? 5).toFixed(1)}</span>
                <span className="mb-2"><AnimatedStars value={google?.rating ?? 5} className="h-6 w-6" /></span>
              </span>
              <span className="relative mt-3 text-sm text-ink/55">{rating}{google?.total ? ` · ${google.total}` : ""}</span>
              <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Read our reviews
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-ivory transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
              </span>
            </a>
          </Reveal>

          {/* Trustpilot card */}
          <Reveal delay={0.2}>
            <a href={reviews.trustpilot.reviewUrl} target="_blank" rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-[30px] bg-ink p-8 text-ivory shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:p-10">
              <span aria-hidden className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-[#00B67A]/15 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <span className="relative flex items-center gap-2 text-xl font-semibold">
                <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[72deg]">
                  <path d="M12 1.5l3.09 7.26 7.86.68-5.96 5.17 1.79 7.69L12 18.27 5.22 22.3l1.79-7.69L1.05 9.44l7.86-.68L12 1.5z" fill="#00B67A" />
                </svg>
                Trustpilot
              </span>
              <span className="relative mt-auto pt-10 font-display text-[1.9rem] font-light leading-tight">Review us on Trustpilot</span>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
              </span>
            </a>
          </Reveal>
        </div>

        {google && google.reviews.length > 0 && (
          <>
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {google.reviews.map((r, i) => (
                <Reveal as="li" key={`${r.author}-${i}`} delay={0.05 * i}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </ul>
            <p className="mt-10 text-center">
              <a href={googleHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ink/70 underline decoration-gold underline-offset-4 hover:text-gold-deep">
                Read all reviews on Google
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
