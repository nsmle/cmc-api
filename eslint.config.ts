import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { readFileSync } from "fs";
import tsEslint from "typescript-eslint";

const gitIgnores: string[] = readFileSync(".gitignore", "utf8")
  .split("\r\n")
  .filter((f): number => f.length);

const isForBuild: boolean = process.argv.includes("build");
const tsConfig: string = isForBuild ? "tsconfig.build.json" : "tsconfig.json";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
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
          printWidth: 80,
          endOfLine: "crlf",
          bracketSpacing: true,
          quoteProps: "consistent",
          arrowParens: "always",
          parser: "typescript",
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx,cts,mts,js,cjs,mjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: "./",
        project: tsConfig,
        sourceType: "module",
      },
    },
    plugins: {
      "typescript-eslint": tsPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      ...(isForBuild
        ? {
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-explicit-any": "warn",
          }
        : {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/no-unused-vars": [
              "warn",
              {
                vars: "all",
                args: "none",
                caughtErrors: "none",
                ignoreRestSiblings: false,
                reportUsedIgnorePattern: false,
              },
            ],
          }),
    },
  },
);
