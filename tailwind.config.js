/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg","./node_modules/flowbite/**/*.js",],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

