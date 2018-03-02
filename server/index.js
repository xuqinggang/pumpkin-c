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
const chalk = require('chalk');

const config = require('./config/env');
const koaConf = require('./config/koa');

// sentry log
const sentry = require('./lib/sentry');

// const routerConf = require('./routes');

const app = new Koa();

// koa基本配置(各个中间件)
koaConf(app);

// 客户端渲染的router配置
// router配置
// routerConf(app);

// 本地server和线上test环境 router配置
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
    console.error('error', err);
    // 生产环境发送error到sentry
    if (process.env.NODE_ENV === 'production') {
        sentry.captureException(err);
    }
});

// api接口log
app.on('api', (info) => {
    console.log(chalk.red(info));
});

// ReactDOMServer renderToString
app.on('render', (info) => {
    console.log(chalk.red(info));
});
