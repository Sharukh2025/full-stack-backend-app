import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended", 'eslint:recommended', 'plugin:node/recommended', 'plugin:security/recommended',], languageOptions: { globals: globals.browser } },
]);
