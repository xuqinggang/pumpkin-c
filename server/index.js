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

// import logger from './util/log';
const errorHandleMiddle = require('./middleware/error.middleware');
const config = require('./config/env');
const koaConf = require('./config/koa');

// const routerConf = require('./routes');

const app = new Koa();

//错误处理中间件,放在最开始的时候
app.use(errorHandleMiddle());

// koa基本配置
koaConf(app);

// log记录
// router use : this.logger.error('msg')
// app.use(async (ctx, next) => {
// 	ctx.logger = logger
// 	await next()
// });

// 没有服务器端渲染的配置
// router配置
// routerConf(app);

// 本地server test环境测试router配置
if (config.env === 'test') {
    const proxyRouterConf = require('./routes/proxyRouter');

    proxyRouterConf(app);
}

if (config.env === 'test' || config.env === 'production') {
    const serverRenderConf = require('../server-render/dist/js/index.js');
    serverRenderConf(app);
}

// 静态资源文件 router
app.use(mount('/bj/nangua', KoaStatic('dist')));

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
