const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

module.exports = function(app) {
    const router = new Router();
    const wrapRouter = new Router();
    
    const indexHtml = fs.readFileSync(path.resolve('./dist/index.html'));
    const mapHtml = fs.readFileSync(path.resolve('./dist/map.html'));

    // 就绪性检查
    router.get('/ping', function(ctx, next) {
        ctx.body = 'pong';
        // ctx.router available
    });

    router.get('/map', function(ctx, next) {
        ctx.type = 'html';
        ctx.body = mapHtml;
    });

    router.get('*', function(ctx, next) {
        ctx.type = 'html';
        ctx.body = indexHtml;
    });

    wrapRouter.use('/bj/nangua', router.routes(), router.allowedMethods());
    app.use(wrapRouter.routes());
};
