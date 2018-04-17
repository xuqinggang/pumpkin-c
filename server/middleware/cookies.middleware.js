/**
 * middleware-种cookie
 * author xuqinggang
 * @date 2018-04-17 10:40
 */

const cookiesMiddle = () => (
    async (ctx, next) => {
        const channelCookie = getChannelCookie(ctx);
        if (channelCookie) {
            ctx.cookies.set(
                "NANGUA-CHANNEL",
                channelCookie,
                {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                }
            );
        }

        await next();
    }
);

function getChannelCookie(ctx) {
    // * url含有BD特殊变量daili
    // * url含有SEM特殊变量
    // * refer为空
    // * refer不为空且不是来自站内focus.cn
    const url = ctx.request.url;
    // url含有daili或sem参数时更新cookie
    if (url.includes("daili") || url.includes("utm_source")) {
        return "url:" + url;
    }

    const referer = ctx.request.headers.referer;
    // referer为空时更新cookie
    if (!referer) {
        return "referer:direct"
    }

    // 站内的refer不更新cookie
    if (referer.includes("focus.cn")) {
        return null;
    } else {
        return "referer:" + referer;
    }
}

module.exports = cookiesMiddle;
