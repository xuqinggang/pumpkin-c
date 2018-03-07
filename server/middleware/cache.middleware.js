/**
 * middleware-缓存中间件
 * author xuqinggang
 * @date 2018-02-10 14:02
 */

const lruCache = require('../lib/lruCache');

// 对列表页和详情页，进行缓存
// url中存在'list'or'detail'标识，则分别代表列表页和详情页
const cacheUrlMarkArr = [
    'list',
    'detail',
];

const cacheMiddle = () => (
    async (ctx, next) => {
        const url = ctx.request.url;
        const cacheRt = lruCache.get(url);
        if (cacheRt) {
            ctx.status = 200;
            ctx.body = cacheRt;
            return;
        }
        await next();

        cacheUrlMarkArr.some((urlMark) => {
            if (url.indexOf(urlMark) !== -1) {
                lruCache.set(url, ctx.body);
                return true;
            }
        });
    }
);

module.exports = cacheMiddle;
