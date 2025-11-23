import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        gray: {
          light: "#F3F4F6",
          DEFAULT: "#6B7280",
          dark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
export default config;

