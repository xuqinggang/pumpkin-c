/**
 * middleware-错误处理
 * author xuqinggang
 * @date 2017-10-19 20:20
 */
'use strict';

const errorHandleMiddle = () => (
    async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // ctx.status = err.status || 500;
            // 所有错误统一显示404;
            ctx.status = 404;
            ctx.body = 'Sorry! Not Found';
            // let error_msg = err.message;
            // ctx.body = { error_msg: error_msg }
            ctx.app.emit('error', err, ctx)
        }
    }
);

module.exports = errorHandleMiddle;
