/**
 * 启动入口文件
 * author xuqinggang
 * @date 2017-10-19 20:11
 */
'use strict';

const Koa = require ('koa');
const KoaStatic = require('koa-static');
const Router = require('koa-router');

const path = require('path');
// import logger from './util/log';
const errorHandleMiddle = require('./middleware/error.middleware');
const config = require('./config/env');
const koaConf = require('./config/koa');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const serverRouter = new Router();
const router = new Router();

const app = new Koa();

// log记录
// router use : this.logger.error('msg')
// app.use(async (ctx, next) => {
// 	ctx.logger = logger
// 	await next()
// });

serverRouter.all(/\/v1/, (ctx) => {
    console.log('v1');
    ctx.respond = false;
    proxy.web(ctx.req, ctx.res, {
        target: 'http://10.23.64.8',
        headers: {
            host: 'api.nanguazufang.com',
        },
    });
});
router.get('/ping', function (ctx, next) {
    ctx.body = 'pong';
  // ctx.router available
});

//错误处理中间件
app.use(errorHandleMiddle());

// koa基本配置

koaConf(app);

app.use(KoaStatic('dist'));
app.use(serverRouter.routes());

app.use(router.routes())
    .use(router.allowedMethods());

// routerConf(app);
app.listen(config.port, function(err) {
    if (err) {
        console.log('error: ', err);
        return;
    }
    console.log(`server start at port: ${config.port}`);
});

//错误监听
app.on('error', (err, ctx) => {
	if (process.env.NODE_ENV != 'test') {
		console.error('error', err)
        ctx.logger.error({ url: ctx.req.url }, err);
	}
});
