/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        /* Light-theme palette (same in light and dark OS theme) — inspired by mikkelmalmberg.com */
        page: {
          text: "#1c1917",
          bg: "#fafaf9",
          accent: "#2563eb",
          quote: "#b45309",
          border: "#e7e5e4",
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Roboto Mono'", "monospace"],
      },
      maxWidth: {
        content: "600px",
        wide: "800px",
        table: "1200px",
        mobile: "360px",
      },
    },
  },
  plugins: [],
};
