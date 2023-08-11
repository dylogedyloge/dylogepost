/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  direction: {
    rtl: "rtl",
  },
  theme: {
    extend: {
      fontFamily: {
        "sans-en": ["Montserrat", "sans-serif"],
        // "sans-en": ["Courier Prime", "monospace"],

        "sans-fa": ["Noto Sans Arabic", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["business", "lofi"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
