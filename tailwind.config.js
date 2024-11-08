/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',  
      'md': '768px',  
      'lg': '1024px', 
      'xl': '1280px', 
      '2xl': '1536px', 
    },
    extend: {
      colors: {
        red: '#E53945',
        blue: '#457B9D',
        white: '#F9F9F9',
        black: '#1D1D1D',
        gray: '#6C757E',
        old: '#4b5563',
        light: '#A2ABB3',
       
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};