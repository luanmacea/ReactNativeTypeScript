import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
    eslint.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tseslintParser,
        },
        plugins: {
            "@typescript-eslint": tseslint,
            prettier: prettier,
        },
        rules: {
            "prettier/prettier": ["error", { "endOfLine": "lf" }],
            "@typescript-eslint/no-unused-vars": ["warn"]
        },
    },
];
