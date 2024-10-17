/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
       'l-blue':"#4db2b8",
        'lh-blue':'#5d9da1' 
      }
    },
  },
  plugins: [],
}