import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import webpackMerge from 'webpack-merge';
import path from 'path';

import webpackBaseConf from './webpack.config.base';
import baseConfig from './baseConfig';

// 添加css,js压缩
const webpackTestConf = webpackMerge.smart(webpackBaseConf, {
    output: {
        publicPath: baseConfig.publicPath,
        filename: 'js/[name].[chunkhash:8].js',
    },
    
    module: {
        // css压缩
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
                        'postcss-loader',
                    ]
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
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

        // js压缩
        new UglifyJsPlugin({
            uglifyOptions: {
                cache: true,
                warnings: false,
                compress: {
                    warnings: false,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 死代码消除
                    dead_code: true,  
                },
                output: {
                    // 删除所有的注释
                    comments: false,
                    // 最紧凑的输出
                    beautify: false,
                },
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         // 内嵌定义了但是只用到一次的变量
        //         collapse_vars: true,
        //         // 提取出出现多次但是没有定义成变量去引用的静态值
        //         reduce_vars: true,
        //         // 删除所有的 `console` 语句
        //         // 还可以兼容ie浏览器
        //         drop_console: true,
        //         // 死代码消除
        //         dead_code: true,  
        //     },
        //     output: {
        //         // 删除所有的注释
        //         comments: false,
        //         // 最紧凑的输出
        //         beautify: false,
        //     }
        // }),
    ],
});

export default webpackTestConf;
