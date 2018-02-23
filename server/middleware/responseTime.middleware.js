/**
 * middleware-responseTime
 * author xuqinggang
 * @date 2018-02-22 10:18
 */
'use strict';
const chalk = require('chalk');

const responseTimeMiddleware = () => (
    async (ctx, next) => {
        const start = Date.now();
        await next();
        const deltaMs = Date.now() - start;
        ctx.set('X-Response-Time', `${deltaMs}ms`);
        console.log(chalk.green(`[${Date(start)}] ${ctx.url} responseTime-${deltaMs}ms`));
    }
);

module.exports = responseTimeMiddleware;
