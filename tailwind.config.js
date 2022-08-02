/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['"Open Sans"', 'sans-serif']
      },
      colors: {
        primary: '#4D46FA',
        orange: '#F06336'
      },
      backgroundImage: {
        bamboo: "url('/public/img/icon1.jpg')",
        vietnamAirlines: "url('/public/img/icon2.jpg')",
        vietjetAir: "url('/public/img/icon3.jpg')",
      }
    },
  },
  plugins: [],
}