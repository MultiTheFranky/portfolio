import astroPlugin from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTs from "eslint-config-airbnb-typescript";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

export default [
    // Ignore node_modules and build outputs
    {
        ignores: ["node_modules/**", "dist/**"]
    },

    // Base config for JS/TS files using Airbnb + Prettier
    {
        files: ["**/*.{js,jsx,ts,tsx}", "**/*.d.ts"],
        // apply Airbnb base parserOptions and rules
        languageOptions: {
            parser: tsParser,
            parserOptions: airbnbBase.parserOptions || {}
        },
        plugins: {
            import: importPlugin,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11yPlugin
        },
        rules: {
            ...airbnbBase.rules,
            ...airbnbTs.rules,
            ...prettierConfig.rules,
            "react/jsx-filename-extension": "off"
        }
    },

    // Astro files (and their <script> tags), parsed as TypeScript
    ...astroPlugin.configs["flat/recommended"],
    {
        files: ["**/*.astro"],
        rules: prettierConfig.rules
    }
];
