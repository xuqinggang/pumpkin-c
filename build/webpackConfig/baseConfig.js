export default {
    dev: {
        port: 8888,
        host: '10.0.120.35',
        proxy: {
            '/v1': {
                target: 'http://10.23.64.8',
                headers: {
                    host: 'api.nanguazufang.com',
                },
            },
        },
    },
    prod: {
        pathPrefix: '/',
        publicPath: '/',
        distPath: './dist',
    },
};
