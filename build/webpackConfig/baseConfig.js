export default {
    dev: {
        port: 8888,
        host: '10.0.120.35',
        proxy: {
            '/bj/nangua/api/v1': {
                target: 'http://10.23.64.8',
                headers: {
                    host: 'api.nanguazufang.com',
                },
            },
        },
        pathPrefix: '/',
        publicPath: '/',
    },
    test: {
        pathPrefix: '/',
        publicPath: '/bj/nangua/',
        distPath: './dist',
    },
    production: {
        pathPrefix: '/',
        publicPath: '/bj/nangua/',
        distPath: './dist',
    },
};
