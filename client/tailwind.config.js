/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
