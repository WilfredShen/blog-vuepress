module.exports = {
  parser: "vue-eslint-parser",
  plugins: ["prettier", "@typescript-eslint"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
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
    quotes: ["error", "double"],
    // "comma-dangle": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "vue/multi-word-component-names": "off",
  },
};
