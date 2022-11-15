/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "MD Primer",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica",
        "sans-serif",
      ],
    },
    extend: {},
  },
  plugins: [],
};
