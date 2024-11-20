// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "no-console": "off",
    "arrow-parens": ["error", "as-needed"],
    "vue/html-self-closing": "off",
    "comma-dangle": ["error", "never"],
    "vue/multi-word-component-names": "off",
    "vue/singleline-html-element-content-newline": "off",
    "space-before-function-paren": "off",
    curly: ["error", "multi-line"],
    quotes: ["error", "double"],
    "vue/html-quotes": ["error", "double"],
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called"
      }
    ]
  }
}
