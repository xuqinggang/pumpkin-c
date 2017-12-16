import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import StyleLintFormatter from 'stylelint-formatter-pretty';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import path from 'path';

import baseConfig from './baseConfig';


const resolve = dir => path.resolve(baseConfig.rootDir, dir);

const includePaths = [
    path.resolve(baseConfig.rootDir, 'src'),
];

const webpackBaseConf = {
    entry: {
        index: resolve('src/application/App/index.js'),
        map: resolve('src/application/Map/map.js'),

        vendors: [
            'babel-polyfill',
            'react',
            'redux',
            'react-dom',
            'react-redux',
            'react-router',
            'prop-types',
            'react-tap-event-plugin',
        ],
    },

    output: {
        // publicPath: baseConfig.publicPath,
        path: resolve(baseConfig.distPath),
        filename: 'js/[name].[chunkhash:8].js',
    },

    resolve: {
        extensions: ['.css', '.less', '.js', '.jsx', '.json'],
        alias: {
            Shared: resolve('src/components/Shared'),
            components: resolve('src/components'),
            App: resolve('src/application/App'),
            Map: resolve('src/application/Map'),
            styles: resolve('src/styles'),
            config: resolve('src/config'),
            lib: resolve('src/lib'),
        },
    },

    plugins: [

        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),

        // 生成入口文件的公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', 
            filename: 'js/vendor/common.[hash:8].js',
            chunks: ['index', 'map'],
        }),

        // 第三方库文件模块的生成
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendor/vendor.[hash:8].js', // 生成的公共模块的存放路径

            // name: ['vendors', 'manifest'],
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
            minChunks: Infinity,
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/application/App/index.html',
            chunks: ['common', 'vendors', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
            inject: true,
            cache: true,
            minify: { //压缩HTML文件  
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
        }),

        new HtmlWebpackPlugin({
            template: 'src/application/Map/map.html',
            filename: 'map.html',
            chunks: ['common', 'vendors', 'map'], // 需要引入的chunk，不配置就会引入所有页面的资源
            inject: true,
            // hash: true,
            cache: true,
            minify: { //压缩HTML文件  
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
        }),
    ],

    module: {
        rules: [
            // js rules
            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: includePaths,
            //     options: {
            //         formatter: eslintFriendlyFormatter,
            //     },
            // },
            {
                test: /\.js$/,
                include: includePaths,
                loaders: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            // assets rules
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
        ],
    },
};

export default webpackBaseConf;
