const env = process.env.NODE_ENV || 'production';

const config = {
    test: {
        target: 'http://10.10.120.180',
    },
    production: {
        target: 'https://m.focus.cn',
    },
}[env];

export default config;
