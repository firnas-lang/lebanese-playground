/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firnas': {
          500: '#d79f00',
          700: '#bb8900'
        }
      },
    },
  },
  plugins: [],
}

