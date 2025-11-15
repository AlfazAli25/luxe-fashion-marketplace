/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: {
            primary: '#0A0A0B',
            elevated: '#141416',
            surface: '#1C1C1F',
          },
          primary: {
            DEFAULT: '#00D9C0',
            hover: '#00F5D4',
          },
          secondary: '#7C3AED',
          accent: '#F59E0B',
          success: '#10B981',
          error: '#EF4444',
          text: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
            muted: '#9CA3AF',
          },
          border: {
            DEFAULT: '#27272A',
            hover: '#3F3F46',
          },
        },
      },
      boxShadow: {
        'dark-md': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 24px rgba(0, 217, 192, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
