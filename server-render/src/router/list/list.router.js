import Router from 'koa-router';

import listContro from './list.controller';

const router = new Router();

router.get('/:filterUrlFragment?', listContro);

export default router;
