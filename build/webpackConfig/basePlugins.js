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
            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        }),
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/application/App/index.html',
            chunks: ['common', 'vendors', 'index'], // 需要引入的chunk，不配置就会引入所有页面的资源
            inject: true,
            cache: true,
            minify: { //压缩HTML文件  
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
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
                collapseWhitespace: false //删除空白符与换行符
            },
        }),
        
    ];

    // if (context.env.NODE_ENV === 'production') {
    //     plugins.unshift(new webpack.optimize.UglifyJsPlugin({
    //         compress: true,
    //     }));
    // }

    return plugins;
};
