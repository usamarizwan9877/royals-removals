# The Royals Removals — Homepage redesign

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion 12 · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
Deploy: push to GitHub → import in Vercel (zero config).

## Structure
```
app/            layout (fonts, metadata, JSON-LD), page, error, 404
content/site.ts single source of truth — all original homepage copy, links, contacts
components/
  layout/       Header, DesktopNavigation, MobileNavigation, Footer
  sections/     Hero, TrustBar, Services, About, WhyChooseUs, Process, Included,
                Insurance, Areas, Reviews, Logistics, FAQ, FinalCTA
  ui/           Reveal, SectionHeader/Title, CallbackForm, Trustpilot, RouteJourney, icons
docs/CONTENT-MAP.md  audit of the live homepage + items to confirm
```

## Design notes
- Palette: ink navy `#0E1626`, ivory `#F6F1E8/#FBF8F3`, champagne `#EFE6D5`, royal gold `#B08D57`.
- Type: Fraunces (display, italic gold for the original highlighted words) + Manrope (body), self-hosted via `next/font`.
- Motif: the palace-window **arch** for images, and a gold **route** from home to home with a van driving it (hero, process, final CTA).
- Motion: scroll reveals, parallax, scroll-driven van in "How It Works", stacking boxes, self-drawing shields, animated nav/accordion. All respects `prefers-reduced-motion`.

## Images
Images load from `https://www.theroyalsremovals.co.uk/images/…` through `next/image` (see `next.config.mjs`).
When this replaces the live site, copy `/images` into `public/images/` and change `IMG` in `content/site.ts` to `"/images"`.
