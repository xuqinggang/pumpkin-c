module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 75,
            propList: ['*', '!font', '!font-size'],
        },
        // 'postcss-import': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 1%', 'Android >= 4'],
        },
    },
};
