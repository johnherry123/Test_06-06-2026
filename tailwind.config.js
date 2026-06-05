/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redson: '#8B0000', // Đỏ Son
        redsonDark: '#5E0000',
        vangdong: '#B8860B', // Vàng Đồng
        vangdongLight: '#DAA520',
        nautram: '#3E2723', // Nâu Trầm
        giaydo: '#F5DEB3', // Giấy dó / Lụa
        giaydoDark: '#E6C280',
      },
      fontFamily: {
        thuphap: ['"Dancing Script"', 'cursive'], // Thư pháp Việt style
        cotruyen: ['"Playfair Display"', 'serif'], // Chữ có chân cổ điển
        hiendai: ['"Montserrat"', 'sans-serif'], // Nét hiện đại, sang trọng
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22matrix%22 values=%221 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.05 0%22 /%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
        'gold-gradient': 'linear-gradient(135deg, #DAA520 0%, #B8860B 50%, #8B6508 100%)',
        'red-gradient': 'linear-gradient(to bottom, #8B0000, #5E0000)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
