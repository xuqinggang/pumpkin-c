import path from 'path';

const env = process.env.NODE_ENV || 'production';

const config = {
    // 各环境公共的配置
    common: {
        env: env,
        distPath: './dist',
        rootDir: path.resolve(__dirname, '..'),
        includePaths: path.resolve(__dirname, '../src'),
    },
    dev: {
        port: 8888,
        host: '10.0.120.35',
        proxy: {
            '/bj/nangua/api/v1': {
                target: 'http://10.10.120.180',
                headers: {
                    host: 'm.nangua.test.cn',
                },
            },
        },
        publicPath: '/',
    },
    test: {
        publicPath: '/bj/nangua/',
        // 手动设置test测试环境的变量为生产环境
        env: 'production',
    },
    production: {
        publicPath: '//static-1252921496.file.myqcloud.com/pumpkin-c/',
    },
};


export default Object.assign({}, config.common, config[env]);
