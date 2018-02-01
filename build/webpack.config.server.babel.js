import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import webpackMerge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';
import baseConfig from './baseConfig';

const resolve = dir => path.resolve(baseConfig.rootDir, dir);
const includePaths = [
    path.resolve(baseConfig.rootDir, 'src'),
    path.resolve(baseConfig.rootDir, 'server-render/src'),
];

// 添加css,js压缩
const webpackServerConf = {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        index: resolve('server-render/src/index.js'),
        // index: resolve('src/application/App/routes/config.js'),
    },
    output: {
        path: resolve('server-render/dist'),
        // publicPath: baseConfig.publicPath,
        filename: 'js/[name].js',
    },
    resolve: {
        // webpack去读取es目录下的代码需要使用jsnext:main字段配置的入口 
        mainFields: ['jsnext:main','main'],
        // 配置模块库（通常是指node_modules）所在的位置
        // 默认的配置会采用向上递归搜索的方式去寻找node_modules，但通常项目目录里只有一个node_modules在项目根目录，为了减少搜索我们直接写明node_modules的全路径：
        modules: [resolve('node_modules')],
        extensions: ['.css', '.less', '.js', '.jsx', '.json'],
        alias: {
            Shared: resolve('src/components/Shared'),
            components: resolve('src/components'),
            application: resolve('src/application'),
            baseData: resolve('src/baseData'),
            styles: resolve('src/styles'),
            config: resolve('src/config'),
            lib: resolve('src/lib'),
            images: resolve('src/images'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: includePaths,
                exclude: /\/node_modules\//,
                loaders: [
                    {
                        // babel编译过程很耗时，好在babel-loader提供缓存编译结果选项，在重启webpack时不需要创新编译而是复用缓存结果减少编译流程。babel-loader缓存机制默认是关闭的
                        loader: 'babel-loader?cacheDirectory',
                    },
                ],
            },
            // assets rules
            {
                test: /\.(svg|eot|woff2?|ttf|otf)$/,
                loader: 'ignore-loader',
                // options: {
                //     limit: 4096,
                //     name: 'fonts/[name].[hash:8].[ext]',
                // },
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096*10,
                    name: 'images/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(css|less)$/,
                loader: 'ignore-loader',
            },
        ],
    },
    plugins: [
        // 代码中注入变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(baseConfig.env),
        }),
        // js压缩 此插件压缩比下面的更好
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         cache: true,
        //         warnings: false,
        //         compress: {
        //             warnings: false,
        //             // 内嵌定义了但是只用到一次的变量
        //             collapse_vars: true,
        //             // 提取出出现多次但是没有定义成变量去引用的静态值
        //             reduce_vars: true,
        //             // 删除所有的 `console` 语句
        //             // 还可以兼容ie浏览器
        //             drop_console: true,
        //             // 死代码消除
        //             dead_code: true,  
        //         },
        //         output: {
        //             // 删除所有的注释
        //             comments: false,
        //             // 最紧凑的输出
        //             beautify: false,
        //         },
        //     }
        // }),
    ]
};
export default webpackServerConf;
