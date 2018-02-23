'use strict';

import Router from 'koa-router';
import detailContro from './detail.controller';

const router = new Router();

router.get('/:rentUnitId', detailContro);

export default router;
