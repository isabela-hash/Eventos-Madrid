import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        surface: "var(--color-surface)",
        elevated: "var(--color-elevated)",
        border: "var(--color-border)",
        gold: "var(--color-gold)",
        "gold-dim": "var(--color-gold-dim)",
        champagne: "var(--color-champagne)",
        garnet: "var(--color-garnet)",
        "garnet-soft": "var(--color-garnet-soft)",
        teal: "var(--color-teal)",
        "teal-soft": "var(--color-teal-soft)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-inverse": "var(--color-text-inverse)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      letterSpacing: {
        display: "-0.03em",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(196,151,63,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(196,151,63,0.15)",
      },
      backgroundImage: {
        "gradient-card": "linear-gradient(to top, var(--color-base) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
