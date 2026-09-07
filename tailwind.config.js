/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E6CA85',
          DEFAULT: '#C5A059',
          dark: '#9A7836',
        },
        burgundy: {
          light: '#A02830',
          DEFAULT: '#801D24',
          dark: '#5D1217',
        },
        ivory: '#FAF7F2',
        cream: '#F5EFE6',
      },
      fontFamily: {
        calligraphy: ['"Alex Brush"', 'cursive'],
        cinzel: ['"Cinzel"', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        editorial: ['"Playfair Display"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
