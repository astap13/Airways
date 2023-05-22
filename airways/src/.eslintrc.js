module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "airbnb-typescript/base",
        "prettier",
        "plugin:prettier/recommended",
      ],
      plugins: ["import"],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
              "type": "attribute",
              "prefix": "app",
              "style": "camelCase"
          }
      ],
      "@angular-eslint/component-selector": [
          "error",
          {
              "type": "element",
              "prefix": "app",
              "style": "kebab-case"
          }
      ]

      },
    },
    
    {
      files: ["*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
      },
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"],
    },
  ],
};
