/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'mukta': ['Mukta', 'sans-serif'],
      },
      colors: {
        customBlue: '#4A5995',
        customBg: '#F3F5FF',
      },
    },
  },
  plugins: [],
}