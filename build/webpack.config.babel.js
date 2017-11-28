import baseConfig from './webpackConfig/baseConfig';
import path from 'path';
import basePlugins from './webpackConfig/basePlugins';
import baseRules from './webpackConfig/baseRules';

const resolve = dir => path.resolve(__dirname, '..', dir);
const env = process.env;
env.NODE_ENV = env.NODE_ENV || 'dev';

const context = {
    env,
    pathPrefix: baseConfig.prod.pathPrefix,
    rootDir: resolve('./'),
};

export default {
    entry: {
        app: resolve('src/index.js'),
        vendors: [
            'react',
            'redux',
            'react-dom',
            'react-redux',
            'react-router',
            'prop-types',
        ],
    },

    output: {
        publicPath: baseConfig.prod.publicPath,
        path: resolve(baseConfig.prod.distPath),
        filename: '[name].[chunkhash:8].js',
    },

    resolve: {
        extensions: ['.css', '.less', '.js', '.jsx', '.json'],
        alias: {
            Shared: resolve('src/components/Shared'),
            components: resolve('src/components'),
            views: resolve('src/views'),
            styles: resolve('src/styles'),
            routes: resolve('src/routes'),
        },
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
};
