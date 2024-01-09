/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier-vue/recommended'
  ],
  rules: {
    'vue/no-deprecated-slot-attribute': 'off'
  }
};

module.exports = config;

