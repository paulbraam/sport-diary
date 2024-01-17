/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/app/**/*.vue',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/features/**/*.vue',
    './src/entities/**/*.vue',
    './src/widgets/**/*.vue',
    './src/shared/**/*.vue',
    './plugins/**/*.{js,ts}',
    './src/app.vue',
    './src/error.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
