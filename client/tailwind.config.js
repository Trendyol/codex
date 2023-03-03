/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#1B1212',
        primary: {
          50: '#7c8db5',
          100: '#3b82f6',
          200: '#2563eb',
          300: '#435ebe',
          400: '#29386B',
          500: '#25396f',
        },
        secondary: {
          100: '#6b7280',
          200: '#4b5563',
        },
        background: '#F3F7FF',
        accent: '#1f2937',
        success: '#10B981',
        error: '#EF4444',
      },
      height: {
        header: '70px',
      },
      width: {
        sidebar: '320px',
      },
    },
    screens: {
      xl: { max: '1349px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xs: { max: '479px' },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('flowbite/plugin')],
};
