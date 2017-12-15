/**
 * 启动入口文件
 * author xuqinggang
 * @date 2017-10-19 20:11
 */
'use strict';

const Koa = require('koa');
const fs = require('fs');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const mount = require('koa-mount');
const path = require('path');
const httpProxy = require('http-proxy');
// import logger from './util/log';
const errorHandleMiddle = require('./middleware/error.middleware');
const config = require('./config/env');
const koaConf = require('./config/koa');

const routerConf = require('./routes');

const proxy = httpProxy.createProxyServer();
// const serverRouter = new Router();

const app = new Koa();

//错误处理中间件
app.use(errorHandleMiddle());

// koa基本配置
koaConf(app);

// log记录
// router use : this.logger.error('msg')
// app.use(async (ctx, next) => {
// 	ctx.logger = logger
// 	await next()
// });

// 代理访问v1接口
// serverRouter.all(/\/v1/, (ctx) => {
//     ctx.respond = false;
//     proxy.web(ctx.req, ctx.res, {
//         target: 'http://10.23.64.8',
//         headers: {
//             host: 'test.api.nanguazufang.cn',
//         },
//     });
// });


// 代理接口 router
// app.use(serverRouter.routes());

// 静态资源文件 router
app.use(mount('/bj/nangua', KoaStatic('dist')));

// router配置
routerConf(app);

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
