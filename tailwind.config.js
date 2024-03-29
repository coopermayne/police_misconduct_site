/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg","./node_modules/flowbite/**/*.js",],
  theme: {
    extend: {
      'xl2': '1250px',

    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
}