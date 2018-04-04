const isEmpty = o => o === null || o === undefined;
/**
 * Return cache Api by use store key
 *
 * Examples:
 *
 *    const userInfoCache = generateCacheApi(localStorage, Keys.USER_INFO, 30 * MILLISECONDS_EACH_DAY)
 *    userInfoCache.set({name: 'konglingxing'})
 *    const userInfo = userInfoCache.get()
 * @param {Storage} engine
 * @param {String} key
 * @param {Array} essentialData
 * @param {Number} defaultExpire if defaultExpire is null, the cache will never expire
 * @return {object}
 */
const generateCacheApi = (
    engine, key, essentialData = [], defaultExpire = 7 * 24 * 3600 * 1000,
) => ({
    set: (data, expire = defaultExpire) => {
        // validate essential data
        if (data instanceof Object) {
            essentialData.forEach((e) => {
                if (isEmpty(data[e])) throw new Error(`need ${e} in generateCacheApi`);
            });
        }

        const newData = {
            data,
            expire,
            time: new Date().getTime(),
        };
        return engine.setItem(key, JSON.stringify(newData));
    },
    get: () => {
        const res = engine.getItem(key);
        if (!res) {
            return null;
        }
        const { data, time, expire } = JSON.parse(res);

        // 存储永久不过期
        if (expire === null) {
            return data;
        }

        const now = new Date().getTime();
        if (now - time > expire) {
            return null;
        }
        return data;
    },
});

const Keys = {
    COMMENT_CARD: 'COMMENT_CARD',
};

export const commentStorage = generateCacheApi(window.localStorage, Keys.COMMENT_CARD, [
    'rentUnitId', // we may add type check like 'rentUnitId:string'
    'apartmentId',
    'name',
], null);

export default generateCacheApi;
