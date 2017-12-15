const config = {
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
        distPath: './dist',
    },
    test: {
        publicPath: '/bj/nangua/',
        distPath: './dist',
    },
    production: {
        publicPath: '//static-1252921496.file.myqcloud.com/pumpkin-c/',
        distPath: './dist',
    },
};

export default (context) => {
    const env = context.env;
    return config[env];
}
