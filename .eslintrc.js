module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:vue/essential', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        indent: ['off', 'tab'],
        'no-console': 'off',
        'linebreak-style': ['off', 'unix'],
        'no-unused-vars': 'warn',
        'func-names': 'off',
        'no-process-exit': 'off',
        'object-shorthand': 'off',
        'class-methods-use-this': 'off',
        'prefer-arrow-callback': 'off',
        'max-len': ['warn', { ignoreComments: true, ignoreStrings: true }],
        'consistent-return': 'off',
        'no-restricted-globals': 'off',
        'no-use-before-define': 'off',
        'arrow-body-style': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'warn',
        'spaced-comment': 'warn',
        'object-curly-newline': 'warn',
        'no-plusplus': 'off',
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['default'],
            },
        ],
    },
};
