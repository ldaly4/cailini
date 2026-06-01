import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oat: "#FFF9F0",
        cream: "#FFF8E7",
        clay: "#334EAC",
        coral: "#95BBEA",
        charcoal: "#081F5C",
        cocoa: "#334EAC",
        mist: "#D0E3FF",
        sangria: "#930500"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 28px 80px rgba(8, 31, 92, 0.13)"
      }
    }
  },
  plugins: []
};

export default config;
