const astroPlugin = require("eslint-plugin-astro");
const airbnbBase = require("eslint-config-airbnb-base");
const airbnbTs = require("eslint-config-airbnb-typescript");
const prettierConfig = require("eslint-config-prettier");
let astroParser;
let tsParser;
try {
    astroParser = require("astro-eslint-parser");
} catch (e) {
    throw new Error(
        "astro-eslint-parser not found. Please install it: pnpm add -D astro-eslint-parser"
    );
}
try {
    tsParser = require("@typescript-eslint/parser");
} catch (e) {
    throw new Error(
        "@typescript-eslint/parser not found. Please install it: pnpm add -D @typescript-eslint/parser"
    );
}

module.exports = [
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
            import: require("eslint-plugin-import"),
            react: require("eslint-plugin-react"),
            "react-hooks": require("eslint-plugin-react-hooks"),
            "jsx-a11y": require("eslint-plugin-jsx-a11y")
        },
        rules: Object.assign(
            {},
            airbnbBase.rules || {},
            airbnbTs.rules || {},
            prettierConfig.rules || {}
        )
    },

    // Base config for Astro + TypeScript parsing in .astro files
    {
        files: ["**/*.astro"],
        plugins: {
            astro: astroPlugin
        },
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: [".astro"]
            }
        },
        // directly include the plugin's recommended rules to emulate extends
        rules: Object.assign(
            {},
            (astroPlugin &&
                astroPlugin.configs &&
                astroPlugin.configs.recommended &&
                astroPlugin.configs.recommended.rules) ||
                {},
            prettierConfig.rules || {}
        )
    }
];
