/**
 * 环境配置
 * author xuqinggang
 * @date 2017-10-19 15:04
 */
'use strict'

const path = require('path');

const env = process.env.NODE_ENV || 'production';

const config = {
    env,
    port: 3000,
    root: path.join(__dirname, '../../../'),
    server: {
        test: {
            target: 'http://10.10.120.180',
            host: 'm.nangua.test.cn',
        },
        production: {
            target: 'https://m.focus.cn',
        },
    }[env],
};

module.exports = config;
