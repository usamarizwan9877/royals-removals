import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#0E1626", 800: "#152036", 700: "#1E2B45", 500: "#4A5568" },
        ivory: { DEFAULT: "#F6F1E8", 50: "#FBF8F3", 100: "#F6F1E8", 200: "#ECE4D6" },
        gold: { DEFAULT: "#B08D57", light: "#D8C29B", deep: "#8C6D3D" },
        stone: { DEFAULT: "#8B8F97", line: "#E3DACB" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.28em" },
      borderRadius: { arch: "999px 999px 28px 28px" },
      boxShadow: {
        soft: "0 30px 60px -30px rgba(14,22,38,0.35)",
        card: "0 1px 0 rgba(14,22,38,0.04), 0 20px 40px -24px rgba(14,22,38,0.25)",
      },
      keyframes: {
        drive: { "0%": { offsetDistance: "0%" }, "100%": { offsetDistance: "100%" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
