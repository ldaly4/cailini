import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oat: "#F4EBDD",
        cream: "#FFF8E7",
        clay: "#B85E45",
        coral: "#D5795E",
        charcoal: "#2D2A26",
        cocoa: "#5B4539",
        mist: "#E7DED2"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 28px 80px rgba(61, 45, 36, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
