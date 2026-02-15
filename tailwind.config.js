/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        page: {
          text: "#d5cbc9",
          bg: "#282523",
          accent: "#9474d5",
          quote: "#fdc700",
          border: "#888888",
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
