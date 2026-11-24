import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { seo, contact, faq, logo } from "@/content/site";
import MotionProvider from "@/components/ui/MotionProvider";
import RemovalsCursor from "@/components/ui/RemovalsCursor";
import ButtonFX from "@/components/ui/ButtonFX";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["SOFT", "WONK", "opsz"], style: ["normal", "italic"], display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: { title: seo.title, description: seo.description, url: seo.url, siteName: "The Royals Removals", locale: "en_GB", type: "website", images: ["/images/og-image.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0E1626", width: "device-width", initialScale: 1 };

/* Structured data preserved from the live site */
const jsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", name: "The Royals Removals", url: seo.url,
    potentialAction: { "@type": "SearchAction", target: `${seo.url}/areas/?q={search_term_string}`, "query-input": "required name=search_term_string" } },
  { "@context": "https://schema.org", "@type": ["MovingCompany", "LocalBusiness", "Organization"], name: "The Royals Removals", legalName: "The Royals Removals",
    url: seo.url, logo: `${seo.url}/images/logo_trimmed.png`, image: `${seo.url}/images/og-image.jpg`, telephone: "+447345624506", email: contact.email, taxID: "17089311",
    sameAs: [contact.whatsappHref, contact.facebook, contact.instagram],
    address: { "@type": "PostalAddress", streetAddress: "22 Whitehall Rd", addressLocality: "Birmingham", postalCode: "B9 5EJ", addressCountry: "GB" },
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 52.4862, longitude: -1.8904 }, geoRadius: "50000" },
    priceRange: "££",
    contactPoint: { "@type": "ContactPoint", telephone: "+44 7345 624506", contactType: "customer service", areaServed: "GB", availableLanguage: "English" } },
  { "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.theroyalsremovals.co.uk" />
        <link rel="icon" href={logo.src} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory">Skip to content</a>
        <MotionProvider>{children}<RemovalsCursor /><ButtonFX /></MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
