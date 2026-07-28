import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF7F0",
        cream: "#F5EEE1",
        beige: "#EEE3CF",
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E4CE9C",
          soft: "#F1E4C4",
          deep: "#9C7C3C",
          dark: "#7A5F2C",
        },
        charcoal: {
          DEFAULT: "#3A3327",
          soft: "#6B6152",
          faint: "#9A8F7A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #C6A15B, transparent)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(58, 51, 39, 0.25)",
        gold: "0 10px 40px -10px rgba(198, 161, 91, 0.45)",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floatSlow: "floatSlow 6s ease-in-out infinite",
        bounceSoft: "bounceSoft 2s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
