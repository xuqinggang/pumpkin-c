/**
 * 用于根据request信息添加至window-middle
 * author xuqinggang
 * @date 2018-03-13 17:20
 */

const windowMiddle = () => (
    async (ctx, next) => {
        const headers = ctx.request.header;
        global.window.navigator.userAgent = headers['user-agent'];
        global.navigator = global.window.navigator;
        global.window.location.href = ctx.request.href;
        console.log(headers['user-agent'],'xx');
        await next();
    }
);

export default windowMiddle;
