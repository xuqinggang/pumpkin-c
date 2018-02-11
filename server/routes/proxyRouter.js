'use strict';

const Router = require('koa-router');
const path = require('path');
const httpProxy = require('http-proxy');
const config = require('../config/env');

// (线上和本地)test测试环境
module.exports = function(app) {
    const proxy = httpProxy.createProxyServer();
    const serverRouter = new Router();

    // 代理访问v1接口
    serverRouter.all(/\/v1/, (ctx) => {
        ctx.respond = false;
        proxy.web(ctx.req, ctx.res, {
            target: config.server[config.env].target,
            headers: {
                host: config.server[config.env].host,
            },
        });
    });
    
    // 代理接口 router
    app.use(serverRouter.routes());
};
