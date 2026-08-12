/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'gold': {
          50: '#fdf6ef',
          100: '#f9e8d6',
          200: '#f4d4b3',
          300: '#eebd8c',
          400: '#e8a666',
          500: '#d4914a',
          600: '#b87a3e',
          700: '#9c6632',
          800: '#7d5126',
          900: '#5e3c1a',
        },
        'cream': {
          50: '#fefcf8',
          100: '#fdf8f0',
          200: '#f9f0e0',
          300: '#f5e8d0',
        },
        'charcoal': {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d5d5d9',
          300: '#b8b8be',
          400: '#9a9aa1',
          500: '#7c7c85',
          600: '#5e5e68',
          700: '#40404b',
          800: '#22222e',
          900: '#11111a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slow-spin': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 30px rgba(0, 0, 0, 0.08)',
        'hard': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 40px rgba(212, 145, 74, 0.15)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #d4914a 0%, #b87a3e 100%)',
        'gradient-cream': 'linear-gradient(180deg, #fdf8f0 0%, #ffffff 100%)',
        'gradient-dark': 'linear-gradient(180deg, #11111a 0%, #22222e 100%)',
      },
    },
  },
  plugins: [],
}