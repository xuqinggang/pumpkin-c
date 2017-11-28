export default {
    dev: {
        port: 8888,
        host: '127.0.0.1',
        proxy: {},
    },
    prod: {
        pathPrefix: '/',
        publicPath: '',
        distPath: './dist',
    },
}
