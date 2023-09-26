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
      "blue": "#07f",
      "lightBlue": "#61abff",
      "greyBlue": "#697c9b",
      "hardLightBlue": "#ECEFF5",
      "darkBlue1": "#4b699b",
      "darkBlue2": "#1e2b48",
      "hardDarkBlue1": "#2a3341",
      "harddarkBlue2": "#212630",

      // gauge chart
      "grey" : "rgb(34,48,64)",
      "blueChart": "rgb(0,122,253)",
      "green": "rgb(6,215,108)",

      "red": "#312f",

    },
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
