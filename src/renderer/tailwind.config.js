const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './src/renderer/pages/**/*.{js,ts,jsx,tsx}',
    './src/renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
