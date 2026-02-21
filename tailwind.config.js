/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        /* Light theme from palette (CSS vars in input.css: display-p3 + lab) */
        page: {
          text: "var(--card-foreground)",
          bg: "var(--background)",
          accent: "var(--accent)",
          quote: "var(--chart-4)",
          border: "var(--ring)",
          tableBorder: "var(--table-border)",
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Roboto Mono'", "monospace"],
      },
      maxWidth: {
        content: "600px",
        wide: "800px",
        stickers: "1000px",
        table: "1200px",
        mobile: "360px",
      },
    },
  },
  plugins: [],
};
