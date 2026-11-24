# The Royals Removals — Homepage audit (captured 24 Nov 2026 from the live DOM)

All copy lives verbatim in `content/site.ts`. Components never hard-code homepage copy.

## Navigation / sitemap
```
/ Home
├── /services/            Services
├── /areas/               Areas We Serve
├── /about/               About ▾
│   ├── /prices/          Prices
│   ├── /reviews/         Reviews
│   ├── /insurance/       Insurance
│   └── /blog/            Blog
├── /contact/             Contact
└── Header CTAs: tel:+447345624506 (07345 624506) · /get-a-quote/ "Get Free Quote"
```
Mobile nav: same hierarchy (About submenu as accordion) + quote, call and WhatsApp buttons.

## Homepage sections (original order → component)
| # | Original section (id) | Component |
|---|---|---|
| 1 | Header | `layout/Header`, `DesktopNavigation`, `MobileNavigation` |
| 2 | Hero `#home` (H1, 4 points, Get a Quote, WhatsApp Us, call-back form, Trustpilot, Google Reviews) | `HeroSection` |
| 2b | Trust bar (4 items) | `TrustBar` |
| 3 | `#services` Our Premium Removal Services (7 cards + View All) | `ServicesSection` |
| 4 | Removals Services We Offer Across Birmingham & the West Midlands | `AboutSection` |
| 5 | `#why-us` Moving Made Majestically Simple (6 points) | `WhyChooseUsSection` |
| 6 | `#how-it-works` How It Works (4 steps) | `ProcessSection` |
| 7 | `#whats-included` What’s Included in Our Removals Service | `IncludedSection` |
| 8 | `#insurance` Why Insurance Matters When Moving (3 cards) | `InsuranceSection` |
| 9 | `#areas` Areas We Serve (22 areas + View All) | `AreasSection` |
| 10 | `#testimonials` What Our Customers Say (live Google reviews via Places API + Trustpilot) | `ReviewsSection` |
| 11 | `#logistics` We Handle The Details + 4-image strip | `LogisticsSection` |
| 12 | `#faqs` Frequently Asked Questions (8) | `FAQSection` |
| 13 | `#cta` Ready for a Royal Move? | `FinalCTA` |
| 14 | Footer | `layout/Footer` |

## Integrations preserved
- Web3Forms call-back form (same access key, subject, fields: name, email, phone, honeypot)
- Trustpilot TrustBox (template 56278e9a…, business unit 69f6211d…)
- Google reviews: Elfsight widget (hit its view limit) replaced by a server-side Places API fetch — `lib/googleReviews.ts`, set `GOOGLE_PLACES_API_KEY` (see `.env.example`)
- JSON-LD: WebSite, MovingCompany/LocalBusiness, FAQPage
- Meta title + description

## Images (all from the live site, each used once)
hero: the-royals-removals-birmingham.webp · services: happy_family_moving.png, …15.webp, office-relocation-van.jpg, commercial-removals-van.jpg, …18.webp, …19.webp, equipment-removals.jpg · about: …12.webp · strip: …2, …6, …8, …10.webp · CTA: modern_home_exterior.png · logo_trimmed.png

## Items to confirm
1. Web3Forms hidden `from_name` value wasn't captured — set in `content/site.ts → callback.web3forms.fromName`.
2. The live "What Our Customers Say" section contained only the Elfsight widget (now live Google reviews); no written testimonials exist, so none were added.
3. Student Removals appears only in the footer on the live site — kept there only.
4. "Open 24 Hours" (footer) vs "available 7 days a week" (FAQ) are both kept verbatim — the client may want to align them.
5. Decorative emojis (👑 📝 📱 🔒 ✓ 📍) were replaced with icons; the words are unchanged.
6. New UI microcopy added only for function: form error message, "Skip to content", 404/error pages, "Step 01–04" numbering.
