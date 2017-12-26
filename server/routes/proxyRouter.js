const Router = require('koa-router');
const path = require('path');
const httpProxy = require('http-proxy');

module.exports = function(app) {
    const proxy = httpProxy.createProxyServer();
    const serverRouter = new Router();

    // 代理访问v1接口
    serverRouter.all(/\/v1/, (ctx) => {
        ctx.respond = false;
        proxy.web(ctx.req, ctx.res, {
            target: 'http://10.10.120.180',
            headers: {
                host: 'm.nangua.test.cn',
            },
        });
    });
    
    // 代理接口 router
    app.use(serverRouter.routes());
};
