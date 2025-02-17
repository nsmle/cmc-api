import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { readFileSync } from "fs";
import tsEslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";

const gitIgnores: string[] = readFileSync(".gitignore", "utf8")
  .split("\r\n")
  .filter((f): boolean => f.length && !f.includes("playground"));

const isForBuild: boolean = process.argv.includes("build");
const tsConfig: string = isForBuild ? "tsconfig.build.json" : "tsconfig.json";

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.recommendedTypeChecked,
  prettierConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: [...gitIgnores, "yarn.lock", ".gitignore"],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          useTabs: false,
          tabWidth: 2,
          singleQuote: false,
          trailingComma: "all",
          printWidth: 120,
          endOfLine: "crlf",
          bracketSpacing: true,
          quoteProps: "as-needed",
          arrowParens: "always",
          parser: "typescript",
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx,cts,mts,js,cjs,mjs}", "tests/**/*.{ts,tsx,cts,mts,js,cjs,mjs}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: tsConfig,
        tsconfigRootDir: __dirname,
        sourceType: "commonjs",
      },
    },
    plugins: {
      "typescript-eslint": tsPlugin,
      "prettier": prettierPlugin,
      "import": importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "consistent-return": "off",
      "@typescript-eslint/consistent-return": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "import/no-dynamic-require": "warn",
      "import/no-nodejs-modules": "warn",
      "import/order": [
        "error",
        {
          "groups": [["builtin", "external"], ["internal", "parent", "sibling", "index"], ["type"]],
          "pathGroups": [
            {
              pattern: "@option/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@response/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@core/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@util/**",
              group: "internal",
              position: "before",
            },
          ],
          "pathGroupsExcludedImportTypes": ["type"],
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "never",
        },
      ],
    },
  },
  {
    files: ["tests/**/*.{ts,tsx,cts,mts,js,cjs,mjs}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.{json}", "**/*.config.ts"],
    plugins: {
      "typescript-eslint": tsPlugin,
      "prettier": prettierPlugin,
    },
    extends: [tsEslint.configs.disableTypeChecked],
  },
);
