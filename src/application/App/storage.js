import PropTypes from 'prop-types';

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
    {
        engine,
        key,
        validate = null,
        defaultExpire = 7 * 24 * 3600 * 1000,
    },
) => ({
    set: (data, expire = defaultExpire) => {
        // validate essential data
        // 严格限制, 且不符合的数据是以 console.warn()抛出
        PropTypes.checkPropTypes({ data: validate }, { data }, 'prop', `set storage ${key}`);

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
    push(data, expire = defaultExpire) {
        const oldData = this.get();
        let newData;
        if (Array.isArray(oldData)) {
            newData = [...oldData, data];
        } else {
            newData = [data];
        }
        this.set(newData, expire);
    },
});

const Keys = {
    COMMENT_CARD: 'COMMENT_CARD',
};

export const commentStorage = generateCacheApi({
    engine: window.localStorage,
    key: Keys.COMMENT_CARD,
    validate: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        apartmentId: PropTypes.number,
        rentUnitId: PropTypes.string,
        timestamp: PropTypes.number,
    })),
    defaultExpire: null,
});

export default generateCacheApi;
