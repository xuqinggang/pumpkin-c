module.exports = {
    root: true,
    parserOptions: {
        ecmascript: 6,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
    },
    extends: 'kuaizhan',
    rules: {
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent-props': [1, 4],
        'react/no-array-index-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/label-has-for': 'off',
    },
};
