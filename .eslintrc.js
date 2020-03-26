const path = require("path");

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 2020,
        parser: "@typescript-eslint/parser",
        project: path.resolve(__dirname, "./tsconfig.json")
    },

    ignorePatterns: ["node_modules/", "dist/", "!.eslintrc.js", "*.json", "*.config.*", "shims-*.d.ts"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "@typescript-eslint/interface-name-prefix": "off",

    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?",
                "**/tests/unit/**/*.spec.{j,t}s?",
            ],
            env: {
                jest: true,
            },
        },
        {
            files: ["./src/store/*.{j,t}s", "./tests/unit/**/*.{j,t}s"],
            rules: {
                "@typescript-eslint/no-use-before-define": 0,
                "@typescript-eslint/no-explicit-any": 0
            }
        }
    ],
};
