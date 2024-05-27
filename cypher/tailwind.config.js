/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {},
    colors:{
      primary:'#FF9500'
    },
    fontFamily:{
      primaryFont:['Courier New'],
      secondaryFont:['Abhaya Libre'],
    }
  },
  plugins: [],
}

