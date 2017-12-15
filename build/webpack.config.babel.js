import baseConfig from './webpackConfig/baseConfig';
import path from 'path';
import basePlugins from './webpackConfig/basePlugins';
import baseRules from './webpackConfig/baseRules';
import baseExtraLib from './webpackConfig/baseExtraLib';

const resolve = dir => path.resolve(__dirname, '..', dir);
const env = process.env.NODE_ENV || 'production';

const context = {
    env,
    pathPrefix: baseConfig.prod.pathPrefix,
    rootDir: resolve('./'),
};

const webpackConf = {
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
        publicPath: baseConfig.prod.publicPath,
        path: resolve(baseConfig.prod.distPath),
        filename: 'js/[name].[chunkhash:8].js',
    },

    resolve: {
        extensions: ['.css', '.less', '.js', '.jsx', '.json'],
        alias: {
            Shared: resolve('src/components/Shared'),
            components: resolve('src/components'),
            App: resolve('src/application/App'),
            Map: resolve('src/application/Map'),
            // views: resolve('src/views'),
            styles: resolve('src/styles'),
            config: resolve('src/config'),
            // routes: resolve('src/routes'),
            lib: resolve('src/lib'),
        },
    },

    module: {
        rules: [
            ...baseRules(context),
            ...baseExtraLib(context),
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

if (context.env !== 'production') {
    webpackConf.devtool = 'inline-source-map';
}

export default webpackConf;
