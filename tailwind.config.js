/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#05070b',
          850: '#080c14',
          800: '#0b1120',
          750: '#0f1626',
          700: '#131c2e',
        },
        line: '#1f2937',
        accent: {
          DEFAULT: '#e11d74',
          glow: '#ff2d9a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        crownPulse: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(255, 45, 154, 0.55), 0 0 18px 2px rgba(225, 29, 116, 0.45)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 0 6px rgba(255, 45, 154, 0), 0 0 28px 6px rgba(225, 29, 116, 0.65)',
            transform: 'scale(1.035)',
          },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gridGlow: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        crownPulse: 'crownPulse 2.4s ease-in-out infinite',
        sheen: 'sheen 1.1s ease-out',
        floatIn: 'floatIn 0.5s ease-out both',
        gridGlow: 'gridGlow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
