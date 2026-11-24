/**
 * Live Google reviews via the Google Places API (New), fetched on the server.
 *
 * Env vars (see .env.example):
 *   GOOGLE_PLACES_API_KEY  required — key with "Places API (New)" enabled
 *   GOOGLE_PLACE_ID        optional — looked up by name if not set
 *
 * Responses are cached for 24h, so the site makes roughly one request a day.
 * Returns null when the key is missing or the request fails; the section then
 * falls back to the Google / Trustpilot badges.
 */

const REVALIDATE = 60 * 60 * 24;
const SEARCH_QUERY = "The Royals Removals, 22 Whitehall Rd, Small Heath, Birmingham B9 5EJ";

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  when: string;
};

export type GoogleReviewsData = {
  rating?: number;
  total?: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};

type ApiReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

async function findPlaceId(key: string): Promise<string | null> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id" },
    body: JSON.stringify({ textQuery: SEARCH_QUERY }),
    next: { revalidate: REVALIDATE * 7 },
  });
  if (!res.ok) throw new Error(`Places search ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { places?: { id: string }[] };
  return data.places?.[0]?.id ?? null;
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(key));
    if (!placeId) return null;

    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews" },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`Place details ${res.status}: ${await res.text()}`);

    const data = (await res.json()) as { rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: ApiReview[] };
    const reviews = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        authorPhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        when: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.text && r.rating >= 4);

    return { rating: data.rating, total: data.userRatingCount, mapsUrl: data.googleMapsUri, reviews };
  } catch (err) {
    console.error("[google-reviews]", err);
    return null;
  }
}
