type P = { className?: string };
export const WhatsAppIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.13c-1.5 0-2.95-.4-4.22-1.16l-.3-.18-3.08.8.82-3-.2-.31a8.2 8.2 0 1 1 6.98 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07 4.83 4.83 0 0 0 1.01 2.56 11.05 11.05 0 0 0 4.23 3.74c1.58.68 2.2.74 2.99.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.29Z" />
  </svg>
);
export const FacebookIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.25-1.45 1.5-1.45h1.5V4.47A20 20 0 0 0 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z" /></svg>
);
export const InstagramIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".8" fill="currentColor" />
  </svg>
);
/** Fine line-art removal van used across the route animations. */
export const VanGlyph = ({ className = "h-6 w-10" }: P) => (
  <svg viewBox="0 0 64 36" className={className} fill="none" aria-hidden>
    <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H38v23H3V6.5Z" fill="#0E1626" />
    <path d="M38 11h12.6a3 3 0 0 1 2.5 1.35L59 21v6H38V11Z" fill="#152036" />
    <path d="M42 14h8l4 6h-12v-6Z" fill="#D8C29B" opacity=".9" />
    <path d="M8 12h24" stroke="#B08D57" strokeWidth="1.2" />
    <path d="M14 17.5l2-3 2 3 2-3 2 3" stroke="#B08D57" strokeWidth="1" />
    <circle cx="14" cy="28" r="4.5" fill="#0E1626" stroke="#F6F1E8" strokeWidth="1.6" />
    <circle cx="49" cy="28" r="4.5" fill="#0E1626" stroke="#F6F1E8" strokeWidth="1.6" />
  </svg>
);
