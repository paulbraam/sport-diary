/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['@typescript-eslint'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    // 'plugin:prettier/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx', '.vue'],
        moduleDirectory: ['src', 'node_modules']
      }
    }
  },
  //   rules: {
  //     // @typescript-eslint
  //     '@typescript-eslint/no-unsafe-enum-comparison': 'off',
  //     '@typescript-eslint/restrict-template-expressions': 'off',
  //     "@typescript-eslint/no-unsafe-member-access": "off",
  //     '@typescript-eslint/no-var-requires': 1,
  //     '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  //     '@typescript-eslint/array-type': 'off',
  //     '@typescript-eslint/consistent-type-definitions': 'off',
  //     '@typescript-eslint/no-unsafe-assignment': 'off',
  //     '@typescript-eslint/no-unsafe-call': 'off',
  //     '@typescript-eslint/consistent-type-imports': [
  //       'warn',
  //       {
  //         prefer: 'type-imports',
  //         fixStyle: 'inline-type-imports'
  //       }
  //     ],
  //     '@typescript-eslint/no-misused-promises': 'off',
  //     // import
  //     'import/no-cycle': 'off',
  //     'import/no-anonymous-default-export': 'off',
  //     'import/no-extraneous-dependencies': 'off',
  //     'import/prefer-default-export': 'off',
  //     'import/extensions': ['error', 'never', { css: 'always', json: 'always', vue: 'always' }],
  //     'import/order': [
  //       'error',
  //       {
  //         groups: ['external', 'index', 'sibling', 'parent', 'builtin', 'object', 'type', 'internal']
  //       }
  //     ],
  //     // prettier
  //     'prettier/prettier': [
  //       'error',
  //       {
  //         singleQuote: true,
  //         trailingComma: 'none',
  //         jsxBracketSameLine: false,
  //         endOfLine: 'lf',
  //         jsxSingleQuote: false,
  //         printWidth: 100,
  //         arrowParens: 'always',
  //         tabWidth: 2
  //         // plugins: ['prettier-plugin-tailwindcss'],
  //         // tailwindFunctions: ['clsx']
  //       }
  //     ],
  //     // vue
  //     'vue/multi-word-component-names': 'off',
  //     'vue/no-deprecated-slot-attribute': 'off',
  //     // common
  //     '@typescript-eslint/no-empty-function': 'off',
  //     'comma-dangle': [
  //       'error',
  //       {
  //         arrays: 'never',
  //         objects: 'never',
  //         imports: 'never',
  //         exports: 'never',
  //         functions: 'never'
  //       }
  //     ],
  //     'no-shadow': 'off',
  //     camelcase: 'off',
  //     'no-unused-vars': 'off',
  //     'max-classes-per-file': 'off',
  //     'no-param-reassign': 'off',
  //     'func-names': 'off',
  //     'no-undef': 'off',
  //     'consistent-return': 'off'
  //   }
};

// /** @type {import("eslint").Linter.Config} */
// const config = {
//   root: true,
//   parser: 'vue-eslint-parser',
//   parserOptions: {
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module'
//   },
//   extends: [
//     '@nuxtjs/eslint-config-typescript',
//     'plugin:vue/vue3-recommended',
//     // 'plugin:import/errors',
//     // 'plugin:import/warnings',
//     // 'plugin:import/typescript',
//     // 'plugin:@typescript-eslint/recommended',
//     // 'plugin:@typescript-eslint/recommended-type-checked',
//     // 'plugin:@typescript-eslint/stylistic-type-checked',
//     // 'plugin:prettier-vue/recommended'
//   ]
// };

module.exports = config;

