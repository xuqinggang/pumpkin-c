import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import StyleLintFormatter from 'stylelint-formatter-pretty';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import path from 'path';

export default (context) => {
    const plugins = [
        // new StyleLintPlugin({
        //     syntax: 'less',
        //     files: 'src/**/*.l?(e|c)ss',
        //     formatter: StyleLintFormatter,
        // }),

        new webpack.ProvidePlugin({
            React: 'react',
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
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
