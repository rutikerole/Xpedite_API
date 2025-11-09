/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    'fade-in': 'fadeIn 1s ease-out',
    'slide-up': 'slideUp 0.8s ease-out',
    'pulse-glow': 'pulseGlow 2s infinite',
    'gradient': 'gradient 6s ease infinite',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
    pulseGlow: {
      '0%, 100%': { boxShadow: '0 0 0px rgba(99,102,241, 0.6)' },
      '50%': { boxShadow: '0 0 25px rgba(99,102,241, 0.9)' },
    },
    gradient: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
  },
},

  },
  plugins: [],
}