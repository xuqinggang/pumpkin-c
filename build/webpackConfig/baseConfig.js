export default {
    dev: {
        port: 8888,
        host: '127.0.0.1',
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
        publicPath: '',
        distPath: './dist',
    },
};
