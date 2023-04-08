module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {

    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'transparent': 'rgb(0,0,0,0)',
      
      //  LIGHT MODE
      'purple': '#ad7be9',
      'blue': '#3E54AC',
      'blue2': '#19376D',
      'blue3': '#3A98B9',
      'blueSky': '#BFDCE5',
      'greyLight': '#EEEEEE',

      // DARK MODE
      'blackDark-1': '#181818',
      'blackDark-2': '#141414',
      'blackDark-3': '#2B2B2B',
      'blackDark-4': '#423F3E',
      'greyDark-1': '#a5a5a572',
      'greyDark-2': '#b3b3b3',

    },
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
