/**
 * koa相关配置
 * author xuqinggang
 * @date 2017-10-19 21:57
 */
'use strict'

// import path from 'path';
const logger = require('koa-logger');
// import json from 'koa-json';
// import bodyParser from 'koa-bodyparser';
const conf = require('./env');

module.exports = function(app) {
    if(conf.env === 'dev'){
        // app.use(responseTime());
        app.use(logger());
    }

    // app.use(bodyParser());
    // app.use(json());
}
