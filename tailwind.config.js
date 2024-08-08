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
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`,
      },
    },
  },
  plugins: [],
};
