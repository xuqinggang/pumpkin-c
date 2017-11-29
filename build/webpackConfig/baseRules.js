const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (context) => {
    const includePaths = [
        path.resolve(context.rootDir, './src/'),
        // path.resolve(context.rootDir, './node_modules/kui'),
        // path.resolve(context.rootDir, './node_modules/kz-frame'),
        // path.resolve(context.rootDir, './node_modules/kz-ds'),
    ];

    return [
        //css && less rules
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader',
                ]
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            })
        },
        //js rules
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: includePaths,
            options: {
                formatter: eslintFriendlyFormatter,
            },
        },
        {
            test: /\.js$/,
            include: includePaths,
            loaders: [
                {
                    loader: 'babel-loader',
                },
            ],
        },
        //assets rules
        {
            test: /\.(svg|eot|woff2?|ttf|otf)$/,
            loader: 'url-loader',
            options: {
                limit: 4096,
                name: 'fonts/[name].[hash:8].[ext]',
            },
        },
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            loader: 'url-loader',
            options: {
                limit: 4096,
                name: 'images/[name].[hash:8].[ext]',
            },
        },
    ];
};
