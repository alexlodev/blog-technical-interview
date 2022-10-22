/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#335EEA",
      "gray-700": "#506690",
      "gray-700-light": "#6E84A3",
      "gray-300-lighter": "#6B7C93",
      "gray-600": "#869AB8",
      "gray-300": "#D9E2EF",
      black: "#000000",
      white: "#FFFFFF",
      "backdrop-modal": "#161C2D",
      "white-gray": "#B1C2D9",
      "success-green": "#42BA96",
      "error-red": "#DF4759",
      "warning-yellow": "#F2C94C",
    },
    extend: {
      content: {
        'link': 'url("/assets/wave-card.svg")',
      },
      height: {
        "model-height": "426px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
