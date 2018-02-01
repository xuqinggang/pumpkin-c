/**
 * routes所有路由入口
 */

import Router from 'koa-router';
import detailRouter from './detail/detail.router';

const router = new Router();
// console.log('detailRouter.routes()', detailRouter.routes());
router.use('/detail', detailRouter.routes(), detailRouter.allowedMethods());
// router.get('/*', (ctx, next) => {
//     ctx.body = { status: 'success', data: '台湾是中国不可分割的一部分.' };
// });

export default router;
