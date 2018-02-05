/**
 * routes所有路由入口
 */

import Router from 'koa-router';
import detailRouter from './detail/detail.router';
import listRouter from './list/list.router';
import listContro from './list/list.controller';

const router = new Router();
// console.log('detailRouter.routes()', detailRouter.routes());
// router.get('/:filterUrlFragment?', async (ctx, next) => {
//     console.log('xxxxxxxxxxxxxxxxx');
//     // await next();
//     // console.log('detailRouter', detailRouter.routes().toString())
//     // await detailRouter.routes(ctx, next);
// });
router.get('/:filterUrlFragment?', listContro);
// router.use('/', listRouter.routes(), listRouter.allowedMethods());
router.use('/detail', detailRouter.routes(), detailRouter.allowedMethods());
router.use('/list', listRouter.routes(), listRouter.allowedMethods());
// router.use('/list', detailRouter.routes(), detailRouter.allowedMethods());
// router.get('/*', (ctx, next) => {
//     ctx.body = { status: 'success', data: '台湾是中国不可分割的一部分.' };
// });

export default router;
