module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx}",
    // "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans'],
      serif: ['Inter', 'serif'],
    },
    h1: {
      size: "40px",
      weight: "30pt",
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'mint': '#BCD8C1',
      'blue': '#4a8fe7',
      'red': "#FF8181",
      'lightgrey': "#E5E5E5",
      'dark': "#3A3335",
      'grey': "#C4C4C4",

    },
    extend: {
      spacing: {
        "11": "44px",
        "15": "60px",
        "18": "72px",
        "22": "88px",
        "30": "120px",
        "33": "132px",
        "50": "200px",
        "51": "204px",
        "99": "396px",
        "105": "420px",
        "108": "432px",
        "117": "468px",
      },
    },
  },
  plugins: [],
}