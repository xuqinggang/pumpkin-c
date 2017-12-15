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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(context.env),
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
        
    ];

    if (context.env === 'production') {
        plugins.unshift(new webpack.optimize.UglifyJsPlugin({
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
            }
        }));
    }

    return plugins;
};
