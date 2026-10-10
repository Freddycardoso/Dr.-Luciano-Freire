/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF6EE',
          100: '#F4ECE0',
          200: '#E6D7BE',
          300: '#D4AF37',
          400: '#C5A880',
          500: '#B89762',
          600: '#997843',
          700: '#7A5C2B',
        },
        navy: {
          850: '#111A2E',
          900: '#0F172A',
          950: '#090E17',
        },
        babyblue: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          900: '#0C4A6E',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1EBE5D',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 30px -5px rgba(197, 168, 128, 0.35)',
        'glow-whatsapp': '0 0 35px -5px rgba(37, 211, 102, 0.45)',
        'card-soft': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'beacon': 'beaconPulse 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.92' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        beaconPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.55), 0 0 35px -5px rgba(37, 211, 102, 0.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(37, 211, 102, 0), 0 0 35px -5px rgba(37, 211, 102, 0.45)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0), 0 0 35px -5px rgba(37, 211, 102, 0.45)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '35%, 100%': { transform: 'translateX(200%)' },
        },
      }
    },
  },
  plugins: [],
};
