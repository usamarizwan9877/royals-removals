"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { reviews } from "@/content/site";

declare global { interface Window { Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void } } }

/** Existing Trustpilot TrustBox (same template, business unit and token as the live site). */
export default function Trustpilot({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (window.Trustpilot && ref.current) window.Trustpilot.loadFromElement(ref.current, true); }, []);
  const t = reviews.trustpilot;
  return (
    <>
      <Script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" strategy="lazyOnload"
        onLoad={() => { if (window.Trustpilot && ref.current) window.Trustpilot.loadFromElement(ref.current, true); }} />
      <div ref={ref} className="trustpilot-widget min-h-[52px]" data-locale="en-US" data-template-id={t.templateId}
        data-businessunit-id={t.businessUnitId} data-style-height="52px" data-style-width="100%" data-theme={theme} data-token={t.token}>
        <span className="sr-only">Trustpilot</span>
      </div>
    </>
  );
}
