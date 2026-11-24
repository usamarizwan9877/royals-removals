/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing site URLs all end in a slash (/services/, /areas/birmingham/ …)
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.theroyalsremovals.co.uk", pathname: "/images/**" },
      { protocol: "https", hostname: "theroyalsremovals.co.uk", pathname: "/images/**" },
    ],
  },
};
export default nextConfig;
