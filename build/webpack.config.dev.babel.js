import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import webpackMerge from 'webpack-merge';
import path from 'path';

import webpackBaseConf from './webpack.config.base';
import baseConfig from './baseConfig';

const webpackDevConf = webpackMerge(webpackBaseConf, {

    output: {
        publicPath: baseConfig.publicPath,
    },
    
    devtool: 'inline-source-map',

    devServer: {
        port: baseConfig.port,
        host: baseConfig.host,
        proxy: baseConfig.proxy,
        // contentBase: resolve('dist'),
    },

    module: {
        rules: [
            //css && less rules
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                    ]
                }),
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
                }),
            },
        ],
    },

    plugins: [
        // 代码中注入变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(baseConfig.env),
        }),
    ]
});

export default webpackDevConf;
