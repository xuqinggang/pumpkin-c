module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 75,
            propList: [
                '*', '!font', '!font-size', '!border', '!border-right', '!border-left', '!border-top', '!border-bottom',
            ],
        },
        // 'postcss-import': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 1%', 'Android >= 4'],
        },
    },
};
