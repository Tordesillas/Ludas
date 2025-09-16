import js from "@eslint/js";
import typescriptESLint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const config = [
    {
        ignores: ['node_modules', 'dist', 'build'],
    },
    js.configs.recommended,
    ...typescriptESLint.configs.recommended,
    ...typescriptESLint.configs.recommendedTypeChecked,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptESLint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                }
            },
            sourceType: 'module'
        },
        plugins: {
            '@typescript-eslint': typescriptESLint.plugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off'
        }
    }
];

export default config;