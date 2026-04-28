import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--color-brand)",
        brandSecondary: "var(--color-brand-secondary)",
        accent: "var(--color-accent)",
        textPrimary: "var(--color-text-primary)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)"
      }
    }
  },
  plugins: []
};

export default config;
