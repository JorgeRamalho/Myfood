import { defineConfig, globalIgnores } from "eslint/config";

/** ESLint mínimo para o site canônico (Vite + React). */
export default defineConfig([
  globalIgnores([
    "node_modules/**",
    "dist-site/**",
    "archive/**",
  ]),
  {
    files: ["src/**/*.{js,jsx}", "vite.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);
