import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#080b10",
        panel: "#111827",
        signal: "#00f0ff",
        warning: "#f59e0b",
        danger: "#ef4444",
        success: "#22c55e"
      },
      boxShadow: {
        signal: "0 0 32px rgba(0, 240, 255, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
