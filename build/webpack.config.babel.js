import baseConfig from './webpackConfig/baseConfig';
const path = require('path');
const basePlugins = require('./webpackConfig/basePlugins.js');
const baseRules = require('./webpackConfig/baseRules.js');
const resolve = dir => path.resolve(__dirname, '..', dir);
const env = process.env;

env.NODE_ENV = env.NODE_ENV || 'dev';

const context = {
    env,
    pathPrefix: baseConfig.prod.pathPrefix,
    rootDir: resolve('./'),
}

module.exports = {
    entry: {
        app: resolve('src/index.js'),
        vendors: [
            'react',
            'redux',
            'react-dom',
            'react-redux',
            'react-router',
            'prop-types',
        ]
    },

    output: {
        publicPath: baseConfig.prod.publicPath,
        path: resolve(baseConfig.prod.distPath),
        filename: '[name].[chunkhash:8].js',
    },

    resolve: {
        extensions: ['.css', '.less', '.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            ...baseRules(context),
        ],

    },

    plugins: [
        ...basePlugins(context),
    ],

    devServer: {
        port: baseConfig.dev.port,
        host: baseConfig.dev.host,
        proxy: baseConfig.dev.proxy,
    },
}
