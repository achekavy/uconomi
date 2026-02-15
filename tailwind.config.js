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
        sans: ["SF Mono", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "600px",
        wide: "800px",
      },
    },
  },
  plugins: [],
};
