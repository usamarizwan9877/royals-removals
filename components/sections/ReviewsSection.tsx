import { Star } from "lucide-react";
import { contact, hero, reviews } from "@/content/site";
import { getGoogleReviews, type GoogleReview } from "@/lib/googleReviews";
import SectionHeader from "@/components/ui/SectionHeader";
import Trustpilot from "@/components/ui/Trustpilot";
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
        <Reveal delay={0.1} className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-4">
          <a href={googleHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-full border border-ink/10 bg-white px-5 py-3 shadow-card transition-shadow hover:shadow-soft">
            <span className="font-semibold">{hero.googleLabel}</span>
            <Stars value={google?.rating ?? 5} />
            <span className="text-sm text-ink/60">
              {rating}
              {google?.total ? ` · ${google.total}` : ""}
            </span>
          </a>
          <div className="w-[260px]"><Trustpilot theme="light" /></div>
        </Reveal>

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
