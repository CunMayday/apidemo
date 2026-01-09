/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purdue: {
          campusGold: '#C28E0E',
          athleticGold: '#CEB888',
          black: '#000000',
          gray: '#9D968D',
          darkGray: '#373A36',
        }
      }
    },
  },
  plugins: [],
}
