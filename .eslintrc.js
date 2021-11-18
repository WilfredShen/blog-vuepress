module.exports = {
  parser: "vue-eslint-parser",
  plugins: ["prettier"],
  parserOptions: {
    // parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    BMapGL: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    // "plugin:@typescript-eslint/recommended",
    // "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^h$",
        varsIgnorePattern: "^h$",
      },
    ],
    "space-before-function-paren": "off",
    quotes: ["error", "single"],
    "comma-dangle": ["error", "never"],
  },
};
