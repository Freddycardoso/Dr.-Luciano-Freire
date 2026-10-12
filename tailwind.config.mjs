/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#426BB2',
          deep: '#3D6ABD',
          light: '#9DB8E0',
          pale: '#C3D8F0',
          dark: '#1E2A44',
        },
        accent: {
          green: '#8BB027',
          lime: '#C6DB69',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F4F8FD',
          soft: '#E6EFFA',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1EBE5D',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-brand': '0 0 30px -5px rgba(66, 107, 178, 0.35)',
        'glow-whatsapp': '0 0 35px -5px rgba(37, 211, 102, 0.45)',
        'card-soft': '0 12px 32px -8px rgba(66, 107, 178, 0.08), 0 4px 12px -2px rgba(30, 42, 68, 0.04)',
        'card-hover': '0 20px 40px -12px rgba(66, 107, 178, 0.14), 0 6px 16px -4px rgba(30, 42, 68, 0.06)',
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
