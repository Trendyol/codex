/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
        },
        secondary: {
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
        },
        background: {
          50: 'var(--color-background-50)',
          100: 'var(--color-background-100)',
          200: 'var(--color-background-200)',
        },
        green: {
          100: 'var(--color-green-100)',
          800: 'var(--color-green-800)',
        },
        red: {
          100: 'var(--color-red-100)',
          800: 'var(--color-red-800)',
        },
        yellow: {
          100: 'var(--color-yellow-100)',
          800: 'var(--color-yellow-800)',
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
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
  plugins: [require('flowbite/plugin')],
};
