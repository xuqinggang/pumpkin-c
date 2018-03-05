export default function logTime(asyncExecFun) {
    let start = null,
        end = null;

    return [
        async (ctx, next) => {
            start = Date.now();
            await next();
        },
        asyncExecFun,
        async (ctx, next) => {
            end = Date.now();
            global.app.emit('api', `API total responseTime-${end-start}ms`);
            await next();
        },
    ];
}
