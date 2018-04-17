/**
 * koa相关配置
 * author xuqinggang
 * @date 2017-10-19 21:57
 */
'use strict';

const logger = require('koa-logger');
const errorHandleMiddle = require('../middleware/error.middleware');
const cacheMiddle = require('../middleware/cache.middleware');
const responseTimeMiddleware = require('../middleware/responseTime.middleware');
const cookiesMiddle = require('../middleware/cookies.middleware');

module.exports = function(app) {
    //中间件-错误处理,放在最开始的时候
    app.use(errorHandleMiddle());
    app.use(responseTimeMiddleware());
    // 中间件-日志
    app.use(logger());
    // 植入cookies
    app.use(cookiesMiddle());
    // 中间件-缓存
    // app.use(cacheMiddle());
}
