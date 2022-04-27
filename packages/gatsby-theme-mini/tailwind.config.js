const path = require('path')

module.exports = {
  content: [path.join(__dirname, './src/**/*.{js,jsx,ts,tsx}')],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
