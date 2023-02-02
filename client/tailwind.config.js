/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: "#1B1212",
        primary: {
          100: '#3b82f6',
          200: '#2563eb',
          300: '#495DB8',
          400: '#29386B',
        },
        secondary: {
          100: '#6b7280',
          200: '#4b5563',
        },
        background: '#F3F7FF',
        accent: '#1f2937',
      },
      height: {
        header: '70px',
      },
      width: {
        sidebar: '300px',
      },
    },
    screens: {
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
