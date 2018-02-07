/**
 * routes所有路由入口
 */
import Router from 'koa-router';
import detailRouter from './detail/detail.router';
import listRouter from './list/list.router';
import listContro from './list/list.controller';
import path from 'path';
import fs from 'fs';

const indexHtml = fs.readFileSync(path.resolve('dist/index.html'));
const mapHtml = fs.readFileSync(path.resolve('dist/map.html'));

const router = new Router();

// 就绪性检查
router.get('/ping', (ctx, next) => {
    ctx.body = 'pong';
});

// 客户端渲染的路由
router.get('/map', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = mapHtml;
});

router.get('/login/:xx*', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = indexHtml;
});

router.get('/me/:xx*', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = indexHtml;
});

router.get('/about/:xx*', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = indexHtml;
});

// 服务器端渲染
router.get('/:filterUrlFragment?', listContro);
router.use('/detail', detailRouter.routes(), detailRouter.allowedMethods());
router.use('/list', listRouter.routes(), listRouter.allowedMethods());

export default router;
