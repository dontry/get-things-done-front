module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort", "react-hooks"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:react-hooks/recommended"
  ],
  env: {
    node: true,
    jest: true
  },
  rules: {
    "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 0 }],
    "simple-import-sort/sort": "warn",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn"
  }
};
