// GitHub Pages preview: the deploy workflow sets GITHUB_PAGES=true, which builds a
// static export served from https://<user>.github.io/royals-removals/.
// Local dev and Vercel builds are unaffected.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.PAGES_BASE_PATH || "/royals-removals" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing site URLs all end in a slash (/services/, /areas/birmingham/ …)
  trailingSlash: true,
  ...(isPages && { output: "export", basePath }),
  images: {
    // Static hosting has no image optimizer; images load straight from the live site.
    unoptimized: isPages,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.theroyalsremovals.co.uk", pathname: "/images/**" },
      { protocol: "https", hostname: "theroyalsremovals.co.uk", pathname: "/images/**" },
    ],
  },
};
export default nextConfig;
