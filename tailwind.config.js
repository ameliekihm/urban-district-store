/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    extend: {
      colors: {
        brand: '#141930',
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        stix: ['"STIX Two Text"', 'serif'],
        josefin: ['"Josefin Sans"', 'serif'],
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`,
        emptyCart: `url('../public/images/emptyCart.png')`,
      },
    },
  },
  plugins: [],
};
