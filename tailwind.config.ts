import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (kept for compatibility)
        void: "#080b10",
        panel: "#111827",
        signal: "#00f0ff",
        warning: "#f59e0b",
        danger: "#ef4444",
        success: "#22c55e",
        
        // New unified palette from reference images
        theme: {
          cyan: "#00f0ff",
          magenta: "#ec4899",
          purple: "#a855f7",
          blue: "#3b82f6",
          pink: "#f472b6",
          orange: "#fb923c",
          yellow: "#fbbf24",
          teal: "#14b8a6",
          lavender: "#c084fc",
          rose: "#fb7185",
        }
      },
      boxShadow: {
        signal: "0 0 32px rgba(0, 240, 255, 0.18)",
        "glow-cyan": "0 0 40px rgba(0, 240, 255, 0.3)",
        "glow-magenta": "0 0 40px rgba(236, 72, 153, 0.3)",
        "glow-purple": "0 0 40px rgba(168, 85, 247, 0.3)",
      },
      animation: {
        "aurora-shift": "aurora-shift 20s ease-in-out infinite",
        "hero-pulse": "hero-pulse 8s ease-in-out infinite",
        "orbit-rotate": "orbit-rotate 30s linear infinite",
      }
    }
  },
  plugins: []
};

export default config;
