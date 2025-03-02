// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const stylistic = require("@stylistic/eslint-plugin");

module.exports = tseslint.config(

  {
    files: ['src/**/*.{js,ts,mts,tsx}'],
    ignores: ['node_modules/**', 'dist/**', '.angular/**'],
    rules: {
      "arrow-spacing": ["error", {
        "before": true,
        "after": true
      }],
      "curly": ["error"],
      'computed-property-spacing': ["error", "never"],
      "no-whitespace-before-property": "error",
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "space-in-parens": ["error", "never"],
      // "@stylistic/space-infix-ops": "error",
    },
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      stylistic.configs["recommended-flat"],

    ],
    processor: angular.processInlineTemplates,
    rules: {
      "arrow-spacing": ["error", {
        "before": true,
        "after": true
      }],
      "curly": ["error"],
      'computed-property-spacing': ["error", "never"],
      "no-whitespace-before-property": "error",
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/object-curly-newline": ["error", { "minProperties": 2 }],
      "@stylistic/object-property-newline": "error",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/object-curly-spacing": ["error", "never"],
      "@stylistic/space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always",
      }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/semi-spacing": ["error", {
        "before": false,
        "after": true
      }],
      "@stylistic/key-spacing": ["error", {
        "beforeColon": false,
        "afterColon": true,
      }],
      "@stylistic/no-trailing-spaces": ["error", {
        "skipBlankLines": true,
        "ignoreComments": true
      }],
      "@stylistic/block-spacing": ["error", "never"],
      "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: true }],
      "@stylistic/newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
      "@stylistic/lines-between-class-members": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 0
      }],
      "@stylistic/comma-spacing": ["error", {
        "before": false,
        "after": true
      }],
      "@stylistic/padding-line-between-statements": [
        "error",
        {
          blankLine: "never",
          prev: "*",
          next: "*"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "function"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "return"
        },

        //
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var"]
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*"
        },
        {
          blankLine: "never",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"]
        },
        //
        {
          blankLine: "always",
          prev: "import",
          next: "*"
        },
        {
          blankLine: "never",
          prev: "import",
          next: "import"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "export"
        },
        {
          blankLine: "never",
          prev: "export",
          next: "export"
        },

      ],
      // "@angular-eslint/directive-selector": [
      //   "error",
      //   {
      //     type: "attribute",
      //     prefix: "app",
      //     style: "camelCase",
      //   },
      // ],
      // "@angular-eslint/component-selector": [
      //   "error",
      //   {
      //     type: "element",
      //     prefix: "app",
      //     style: "kebab-case",
      //   },
      // ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ],
    rules: {},
  }
);
