/**
 * 环境配置
 * author xuqinggang
 * @date 2017-10-19 15:04
 */
'use strict'

const path = require('path');

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: 3000,
    root: path.join(__dirname, '../../'),
    //mongodb配置
};

module.exports = config;
