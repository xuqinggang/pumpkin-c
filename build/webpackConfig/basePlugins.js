const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLintFormatter = require('stylelint-formatter-pretty');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = (context) => {
    const plugins = [
        new StyleLintPlugin({
            syntax: 'less',
            files: 'src/**/*.l?(e|c)ss',
            formatter: StyleLintFormatter,
        }),

        new webpack.ProvidePlugin({
            React: 'react',
        }),

        new ExtractTextPlugin({
            filename: `css/[name].[contenthash:8].css`
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendors', 'manifest'],
            minChunks: Infinity,
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            hash: false,
            inject: true,
        }),

    ];

    if (context.env.NODE_ENV === 'production') {
        plugins.unshift(new webpack.optimize.UglifyJsPlugin({
            compress: true,
        }));
    }

    return plugins;
};
