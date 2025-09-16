export default {
    extends: ['stylelint-config-standard'],
    ignoreFiles: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', 'node_modules/**/*', 'dist/**/*', 'build/**/*'],
    plugins: ['@stylistic/stylelint-plugin'],
    rules: {
        'block-no-empty': true,
        'declaration-block-no-duplicate-properties': true,
        'no-empty-source': true,
        '@stylistic/color-hex-case': 'upper',
        'color-hex-length': 'long',
        'rule-empty-line-before': [
            'never',
            {
                except: ['inside-block'],
                ignore: ['first-nested']
            }
        ]
    }
};
