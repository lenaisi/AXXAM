const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "neutralSilver": "#F5F5FA",
        "neutralDGrey": "#4D4D4D",
        "brandPrimary": "#F27438",
        "neutralGrey": "#717171",
        "gray900": "#18191F",
      }
    },
  },
  plugins: [flowbite.plugin(),],
}