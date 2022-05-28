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
      'purple': "#E5CBFF",
      'light-purple': "#F6F0FF",
      'light-blue': "#CDDFF5",
      'background-purple': "#F5EAFF",
      'background-mint': "#E6F2E8",
      'background-blue': "#EAF1FA",

    },
    extend: {
      spacing: {
        "11": "44px",
        "15": "60px",
        "18": "72px",
        "20": "80px",
        "22": "88px",
        "30": "120px",
        "33": "132px",
        "50": "200px",
        "51": "204px",
        "60": "240px",
        "72": "288px",
        "90": "360px",
        "99": "396px",
        "105": "420px",
        "108": "432px",
        "117": "468px",
        "150": "600px",
        "155": "620px",
      },
      animation: {
        blob: "blob 7s infinite",
        bg: "bg 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        'bg': {
          '0%, 100%': {
             'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
             'background-size':'200% 200%',
              'background-position': 'right center'
          }
      },
      },
    },
  },
  plugins: [],
}