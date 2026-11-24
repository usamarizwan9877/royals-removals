/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — copy extracted verbatim from
 *  https://www.theroyalsremovals.co.uk/ (homepage, 24 Nov 2026).
 *  Do not reword. Headings are split into { pre, gold, post }
 *  only to reproduce the original gold-highlighted words.
 * ─────────────────────────────────────────────────────────────
 */

export type Title = { pre?: string; gold: string; post?: string; breakBeforeGold?: boolean };
export type Link = { label: string; href: string };

const IMG = "https://www.theroyalsremovals.co.uk/images";

export const contact = {
  phoneDisplay: "07345 624506",
  phoneHref: "tel:+447345624506",
  whatsappHref: "https://wa.me/447345624506",
  email: "theroyalsremovals@gmail.com",
  address: "22 Whitehall Rd, Small Heath, Birmingham B9 5EJ, United Kingdom",
  hours: "Open 24 Hours",
  facebook: "https://www.facebook.com/theroyalsremovals",
  instagram: "https://www.instagram.com/theroyalsremovals",
  googleReviews: "https://maps.app.goo.gl/kka4CMmj98foBFqT8?g_st=iw",
};

export const seo = {
  title: "Professional Removal Services in West Midlands & Birmingham",
  description:
    "Professional, fully insured removal services across the West Midlands & Birmingham. Stress-free moves with careful handling and transparent pricing.",
  url: "https://theroyalsremovals.co.uk",
};

export const logo = { src: `${IMG}/logo_trimmed.png`, alt: "The Royals Removals" };

/* ── Navigation (exact hierarchy + URLs) ─────────────────── */
export type NavItem = Link & { children?: Link[] };
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Areas We Serve", href: "/areas/" },
  {
    label: "About",
    href: "/about/",
    children: [
      { label: "Prices", href: "/prices/" },
      { label: "Reviews", href: "/reviews/" },
      { label: "Insurance", href: "/insurance/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
  { label: "Contact", href: "/contact/" },
];
export const headerCta: Link = { label: "Get Free Quote", href: "/get-a-quote/" };

/* ── Hero ────────────────────────────────────────────────── */
export const hero = {
  eyebrow: "We Move It Like Royalty",
  h1: { line1: "Professional", highlight: "Removal Services", line3: "in West Midlands & Birmingham" },
  body:
    "From your first box to the last piece of furniture — as trusted movers across the West Midlands, The Royals Removals delivers a stress-free, carefully handled move you can rely on. Your dedicated regional moving company for meticulous and professional care.",
  points: [
    "Fully insured & vetted professional team",
    "Free no-obligation quotes in minutes",
    "Same-day response & flexible move dates",
    "Careful handling & damage protection guarantee",
  ],
  ctaQuote: { label: "Get a Quote", href: "/get-a-quote/" },
  ctaWhatsApp: { label: "WhatsApp Us", href: "https://wa.me/447345624506" },
  image: { src: `${IMG}/the-royals-removals-birmingham.webp`, alt: "The Royals Removals Birmingham" },
  googleLabel: "Google Reviews",
  googleRating: "5.0 Rating",
};

export const callback = {
  title: "Request a Quick Call Back",
  subtitle: "We'll get back to you within 15 minutes",
  submit: "Get Started",
  submitFinal: "Get Started →",
  privacy: "Your information is secure & never shared",
  fields: { name: "Your Name", email: "Email Address", phone: "Phone Number" },
  /* Existing Web3Forms integration (public key already in the live page HTML) */
  web3forms: {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "257bfd98-b90f-4f5b-ae99-f9566a6e35bb",
    subject: "New Call Back Request - The Royals Removals Website",
    fromName: "The Royals Removals Website", // ⚠ confirm against live hidden field value
  },
};

export const trustBar = [
  { title: "Local Movers", text: "Birmingham & West Midlands" },
  { title: "Call or WhatsApp", text: "07345 624506", href: "tel:+447345624506" },
  { title: "Fully Insured", text: "Comprehensive protection" },
  { title: "Same-Day Response", text: "Quote within 15 mins" },
];

/* ── Services ────────────────────────────────────────────── */
export const services = {
  eyebrow: "What We Offer",
  title: { pre: "Our Premium ", gold: "Removal Services" } as Title,
  intro:
    "Whether you need a full house removal, a man-and-van for a quick job, or professional packing to keep your valuables safe, we have a service designed for your exact situation.",
  cta: "Learn More",
  viewAll: { label: "View All Services", href: "/services/" },
  items: [
    {
      title: "House Removals",
      text: "Complete house removal service for all property sizes across Birmingham. Careful handling, furniture wrapping, and full transit protection included.",
      href: "/services/house-removals-services/",
      img: { src: `${IMG}/happy_family_moving.png`, alt: "House Removals Birmingham" },
      icon: "home",
    },
    {
      title: "Furniture Removals",
      text: "Single-item or full furniture moves, carefully wrapped and transported. Sofas, beds, wardrobes, and fragile pieces handled with precision and care.",
      href: "/services/furniture-removals-services/",
      img: { src: `${IMG}/the-royals-removals-birmingham15.webp`, alt: "Furniture Removals Birmingham" },
      icon: "sofa",
    },
    {
      title: "Office Relocation",
      text: "Minimise downtime with our efficient and organised commercial moving service. IT equipment, furniture, and full office relocations handled expertly.",
      href: "/services/office-relocation-services/",
      img: { src: `${IMG}/office-relocation-van.jpg`, alt: "Office Relocation Birmingham" },
      icon: "briefcase",
    },
    {
      title: "Commercial Removals",
      text: "Large-scale business moves for warehouses, retail units, and commercial premises. Project-managed relocations with minimal disruption to operations.",
      href: "/services/commercial-removals-services/",
      img: { src: `${IMG}/commercial-removals-van.jpg`, alt: "Commercial Removals Birmingham" },
      icon: "building",
    },
    {
      title: "Packing Services",
      text: "Professional packing team to safely wrap and box all your belongings using premium materials. Room-by-room, labelled, and ready for transit.",
      href: "/services/packing-services/",
      img: { src: `${IMG}/the-royals-removals-birmingham18.webp`, alt: "Packing Services Birmingham" },
      icon: "package",
    },
    {
      title: "Man and Van",
      text: "Affordable, flexible man-and-van service for smaller moves, single items, and quick deliveries across Birmingham and the West Midlands.",
      href: "/services/man-and-van-services/",
      img: { src: `${IMG}/the-royals-removals-birmingham19.webp`, alt: "Man and Van Birmingham" },
      icon: "truck",
    },
    {
      title: "Equipment Removals",
      text: "Specialist handling for heavy, oversized, and fragile equipment. Fish tanks, gym machines, industrial units, and more — moved safely and securely.",
      href: "/services/equipment-removals-services/",
      img: { src: `${IMG}/equipment-removals.jpg`, alt: "Equipment Removals Birmingham" },
      icon: "dumbbell",
    },
  ],
} as const;

/* ── Birmingham & West Midlands intro ────────────────────── */
export const about = {
  title: { pre: "Removals Services We Offer Across ", gold: "Birmingham & the West Midlands", breakBeforeGold: true } as Title,
  body:
    "At The Royals Removals, we provide professional removals services across Birmingham and the West Midlands for domestic and commercial customers looking for a reliable moving company they can trust. We handle house removals, flat moves, furniture removals, office relocations, commercial moves, packing services, and urgent same-day jobs with a focus on careful handling, secure transport, and clear communication throughout. Whether you are moving within Birmingham or to a nearby area in the West Midlands, our team offers flexible support tailored to your move, including packing help, dismantling and reassembly, and fully insured transport for extra peace of mind.",
  cta: { label: "View Areas We Cover", href: "/areas/" },
  img: { src: `${IMG}/the-royals-removals-birmingham12.webp`, alt: "The Royals Removals professional team in West Midlands" },
};

/* ── Why choose ──────────────────────────────────────────── */
export const why = {
  eyebrow: "Why Royal Removals?",
  title: { pre: "Moving Made ", gold: "Majestically", post: " Simple" } as Title,
  intro:
    "Trusted by hundreds of Birmingham families to deliver a premium, stress-free moving experience. Here is what sets our removal company in Birmingham apart from the rest.",
  items: [
    { title: "Royal-Grade Care", icon: "crown", text: "Every item is treated as if it were our own. We use professional furniture blankets, bubble wrap, and stretch film to protect your belongings from the moment we arrive until the last box is in place." },
    { title: "Fast Quote Response", icon: "zap", text: "Fill in our simple 2-minute form and receive a personalised, transparent quote within 10 to 15 minutes. No chasing, no waiting around, no automated responses — a real person reviews every request." },
    { title: "Fully Insured & Safe", icon: "shield", text: "Complete peace of mind with comprehensive goods-in-transit insurance. Your belongings are protected throughout the entire journey from your old home to your new one." },
    { title: "Flexible Scheduling", icon: "calendar", text: "We work around your timeline. Choose any day of the week including weekends and bank holidays. Need to change your date? No problem — we accommodate changes with minimal notice." },
    { title: "Transparent Pricing", icon: "receipt", text: "No hidden fees, no surprise charges on the day. The quote we give you is the price you pay. We believe in honest, upfront pricing that respects your budget and your trust." },
    { title: "Local Birmingham Experts", icon: "map", text: "Born and raised in Birmingham, we know every road, estate, and postcode. This local expertise means faster routes, better parking planning, and a smoother move for you." },
  ],
} as const;

/* ── Process ─────────────────────────────────────────────── */
export const process = {
  eyebrow: "Simple Process",
  title: { pre: "How It ", gold: "Works" } as Title,
  intro:
    "Moving in Birmingham with our house removal experts is easy, transparent, and stress-free. Here is our simple four-step process.",
  steps: [
    { title: "Get Your Free Quote", text: "Fill in our simple 2-minute form with details about your move. Tell us your property type, where you are moving from and to, and your preferred date. You will receive a personalised, transparent quote within minutes." },
    { title: "Book Your Move", text: "Choose your preferred date, confirm your booking, and relax. There are no hidden fees and the price we quote is the price you pay. We will confirm all the details and keep you informed as your moving day approaches." },
    { title: "We Do the Heavy Lifting", text: "Our professional team arrives on time, handles everything carefully, and keeps you informed throughout the day. We wrap, load, transport, and unload your belongings with precision and care." },
    { title: "Settle Into Your New Home", text: "We place everything exactly where you want it. Furniture is reassembled, boxes are placed in the right rooms, and we make sure you are completely happy before we leave. Welcome home." },
  ],
};

/* ── What's included ─────────────────────────────────────── */
export const included = {
  title: { pre: "What’s Included in Our ", gold: "Removals Service", breakBeforeGold: true } as Title,
  body:
    "When you book The Royals Removals, you get more than just transport. Our removals service includes careful loading and unloading, secure handling of furniture and belongings, safe transport, and practical moving support from start to finish. Where needed, we also offer dismantling and reassembly, packing assistance, and same-day moving options, helping customers across Birmingham and the West Midlands move with less stress and more confidence.",
};

/* ── Insurance ───────────────────────────────────────────── */
export const insurance = {
  eyebrow: "Fully Insured Removals Birmingham",
  title: { pre: "Why Insurance ", gold: "Matters", post: " When Moving" } as Title,
  intro:
    "Moving house or office involves genuine risk. Choosing a fully insured removals company in Birmingham ensures your belongings and property are protected from start to finish — with no compromise.",
  cards: [
    {
      title: "Public Liability Insurance",
      text: "Our public liability removals cover protects against injury or property damage during your move.",
      points: ["Covers injury or property damage", "Up to £5 million cover", "Protects from unexpected accidents"],
      kind: "covered",
    },
    {
      title: "Goods in Transit Insurance",
      text: "Every item is covered under our goods in transit insurance throughout the entire removal journey.",
      points: ["Covers items during transport", "Protection against theft, damage, or loss", "Up to £50,000 cover"],
      kind: "covered",
    },
    {
      title: "What Is Not Covered",
      text: "In the interest of full transparency, standard insurance does not cover the following:",
      points: ["Items after delivery at destination", "Self-packed items (if not packed by us)", "Storage (unless separately arranged)"],
      kind: "excluded",
    },
  ],
  outro: "Want full details on our cover? Read our complete insurance information.",
  cta: { label: "View Full Insurance Details", href: "/insurance/" },
} as const;

/* ── Areas ───────────────────────────────────────────────── */
export const areas = {
  eyebrow: "Coverage",
  title: { pre: "Areas We ", gold: "Serve" } as Title,
  intro:
    "We cover Birmingham and all surrounding towns and cities across the West Midlands, delivering the same premium service wherever you are. Click an area to learn more.",
  items: [
    ["Birmingham", "birmingham"], ["Dudley", "dudley"], ["Sandwell", "sandwell"], ["Walsall", "walsall"],
    ["Wolverhampton", "wolverhampton"], ["Solihull", "solihull"], ["Coventry", "coventry"], ["Lichfield", "lichfield"],
    ["Redditch", "redditch"], ["Bromsgrove", "bromsgrove"], ["Wythall", "wythall"], ["Walmley", "walmley"],
    ["Four Oaks", "four-oaks"], ["Hollywood", "hollywood"], ["Boldmere", "boldmere"], ["Barnt Green", "barnt-green"],
    ["Droitwich Spa", "droitwich-spa"], ["Alcester", "alcester"], ["Tamworth", "tamworth"], ["Cannock", "cannock"],
    ["Royal Leamington Spa", "royal-leamington-spa"], ["Nuneaton", "nuneaton"],
  ].map(([label, slug]) => ({ label, href: `/areas/${slug}/` })),
  viewAll: { label: "+ View All Areas", href: "/areas/" },
};

/* ── Reviews (existing integrations only — no written testimonials on the live page) ── */
export const reviews = {
  eyebrow: "Customer Reviews",
  title: { pre: "What Our ", gold: "Customers Say" } as Title,
  trustpilot: {
    templateId: "56278e9abfbbba0bdcd568bc",
    businessUnitId: "69f6211d68a3e45cacfe1f93",
    token: "329da09d-6ed3-4aff-8a41-45443a14059e",
  },
};

/* ── Logistics ───────────────────────────────────────────── */
export const logistics = {
  eyebrow: "Birmingham Moving Logistics",
  title: { pre: "We Handle The ", gold: "Details" } as Title,
  intro:
    "Moving in Birmingham requires planning. As local experts, we manage parking and emissions compliance so you don't have to.",
  cards: [
    {
      title: "Parking Dispensations",
      before: "We can help advise or arrange the necessary parking suspensions for your moving day. Learn more on the ",
      link: { label: "Birmingham City Council page", href: "https://www.birmingham.gov.uk/info/20109/parking/2012/parking_dispensations" },
      after: ".",
      icon: "parking",
    },
    {
      title: "Clean Air Zone (CAZ) Ready",
      before: "Our modern fleet of removal vehicles is fully compliant with the Birmingham Clean Air Zone. Check details at ",
      link: { label: "Brum Breathes", href: "https://www.brumbreathes.co.uk/" },
      after: ".",
      icon: "leaf",
    },
  ],
  strip: [
    { src: `${IMG}/the-royals-removals-birmingham2.webp`, alt: "Premium removals van Birmingham" },
    { src: `${IMG}/the-royals-removals-birmingham6.webp`, alt: "Professional movers team", caption: "Professional & Trusted Team" },
    { src: `${IMG}/the-royals-removals-birmingham8.webp`, alt: "Professional packing service" },
    { src: `${IMG}/the-royals-removals-birmingham10.webp`, alt: "Beautiful Birmingham home", caption: "Serving Birmingham & Beyond" },
  ],
} as const;

/* ── FAQ (word for word) ─────────────────────────────────── */
export const faq = {
  eyebrow: "Got Questions?",
  title: { pre: "Frequently Asked ", gold: "Questions" } as Title,
  items: [
    { q: "How quickly will I receive my quote?", a: "You will typically receive your personalised quote within 10 to 15 minutes. Our team is available 7 days a week and reviews every request personally — no automated responses." },
    { q: "Are you insured for damage?", a: "Yes, we are fully insured with comprehensive goods-in-transit cover. Your belongings are protected throughout the entire move. We also use professional wrapping and padding to prevent damage in the first place." },
    { q: "Do you offer packing services?", a: "Yes. We offer both full and partial professional packing services. Our trained packers will carefully wrap and box all of your belongings using high-quality materials. We can pack your entire property or focus on fragile and valuable items only." },
    { q: "Can I move on a weekend or bank holiday?", a: "Absolutely. We operate 7 days a week including weekends and most bank holidays. We understand that moving often needs to happen on specific days, and we are happy to accommodate your preferred schedule." },
    { q: "How far in advance should I book?", a: "We recommend booking at least 2 to 4 weeks in advance, particularly during peak periods such as summer and the end of the month. However, we do accommodate short-notice and last-minute moves whenever our schedule allows." },
    { q: "Do you cover areas outside Birmingham?", a: "Yes. While we are based in Birmingham, we serve the entire West Midlands region including Solihull, Sutton Coldfield, Coventry, Wolverhampton, Walsall, Dudley, Sandwell, and many surrounding areas. Contact us to confirm we cover your location." },
    { q: "How do you handle parking and Clean Air Zone (CAZ) charges?", a: "As local Birmingham movers, we handle all the logistics. We can help guide you on arranging parking dispensations with the City Council if needed, and our modern vehicle fleet meets Clean Air Zone requirements, so you won't face unexpected CAZ charges." },
    { q: "Do you dismantle and reassemble furniture?", a: "Yes, our team is fully equipped to dismantle and reassemble beds, wardrobes, and other large furniture items. Simply let us know what you need during your quote process so we can allocate the right amount of time for your move." },
  ],
};

/* ── Final CTA ───────────────────────────────────────────── */
export const finalCta = {
  title: { pre: "Ready for a ", gold: "Royal Move?" } as Title,
  body:
    "Get your free, no-obligation quote in under 2 minutes. Fill out the quick form or call us directly. Our team responds in 10 to 15 minutes.",
  call: { label: "Call 07345 624506", href: "tel:+447345624506" },
  whatsapp: { label: "WhatsApp Us", href: "https://wa.me/447345624506" },
  badges: ["No Hidden Fees", "Fully Insured"],
  img: { src: `${IMG}/modern_home_exterior.png`, alt: "Beautiful home" },
};

/* ── Footer ──────────────────────────────────────────────── */
export const footer = {
  tagline:
    "Birmingham's most trusted premium home removals service. Stress-free, insured, and royal-grade care for every move.",
  services: [
    { label: "House Removals Services", href: "/services/house-removals-services/" },
    { label: "Furniture Removals Services", href: "/services/furniture-removals-services/" },
    { label: "Office Relocation Services", href: "/services/office-relocation-services/" },
    { label: "Commercial Removals Services", href: "/services/commercial-removals-services/" },
    { label: "Packing Services", href: "/services/packing-services/" },
    { label: "Man and Van Services", href: "/services/man-and-van-services/" },
    { label: "Equipment Removals Services", href: "/services/equipment-removals-services/" },
    { label: "Student Removals Services", href: "/services/student-removals-services/" },
  ],
  areas: [
    { label: "Birmingham", href: "/areas/birmingham/" },
    { label: "Dudley", href: "/areas/dudley/" },
    { label: "Sandwell", href: "/areas/sandwell/" },
    { label: "Walsall", href: "/areas/walsall/" },
    { label: "Wolverhampton", href: "/areas/wolverhampton/" },
    { label: "View All Areas →", href: "/areas/" },
  ],
  quote: { label: "Get Free Quote →", href: "/get-a-quote/" },
  copyright:
    "© 2026 TRSR LTD. Trading as: The Royals Removals. All rights reserved.  |  Company No. 17089311  |  Registered in England & Wales",
  legal: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms & Conditions", href: "/terms/" },
    { label: "Sitemap", href: "/sitemap/" },
  ],
};
