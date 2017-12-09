/**
 * 环境配置
 * author xuqinggang
 * @date 2017-10-19 15:04
 */
'use strict'

import path from 'path';

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: 3000,
    root: path.join(__dirname, '../../'),
    //mongodb配置
};

export default config;
