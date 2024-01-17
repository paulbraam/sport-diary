/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './app/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './features/**/*.vue',
    './entities/**/*.vue',
    './widgets/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
