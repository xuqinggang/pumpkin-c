/**
 * 前端应该尽量 view 一点
 * 请不要放太多的东西到 localstorage
 * 如果产品有过多这样的需求，请怼回去 -_-
 */

import PropTypes from 'prop-types';

const fieldEqual = (a, b, field) => {
    if (!a || !b) {
        return false;
    }

    if (!a[field] || !a[field]) {
        return false;
    }

    return a[field] === b[field];
}

const findIndexByField = (arr, obj, field) => {
    return arr.reduce((acc, cur, index) => {
        if (fieldEqual(cur, obj, field)) {
            return index;
        }
        return acc;
    }, -1);
};

/**
 * Return cache Api by use store key
 *
 * Examples:
 *
 *    const userInfoCache =
 *                  generateCacheApi(localStorage, Keys.USER_INFO, 30 * MILLISECONDS_EACH_DAY)
 *    userInfoCache.set({name: 'konglingxing'})
 *    const userInfo = userInfoCache.get()
 * @param {Storage} engine
 * @param {String} key
 * @param {Array} essentialData
 * @param {Number} defaultExpire if defaultExpire is null, the cache will never expire
 * @param {string} uniqueField 当数据是包含对象的数组时, 用来标识一个数据的身份
 * @return {object}
 */
const generateCacheApi = (
    {
        engine,
        key,
        validate = null,
        defaultExpire = 7 * 24 * 3600 * 1000,
        uniqueField = null,
    },
) => ({
    set: (data, expire = defaultExpire) => {
        // validate essential data
        // 非严格限制
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
    remove: () => {
        engine.removeItem(key);
    },
    // TODO 以下为非基本操作, 数组操作 为其专门加一个高阶函数 或者 mixin
    // 添加
    push(data, expire = defaultExpire) {
        const oldData = this.get() || [];
        let newData;
        if (Array.isArray(oldData)) {
            newData = [...oldData, data];
        } else {
            newData = [data];
        }
        this.set(newData, expire);
    },
    // 添加 or 去重更新
    update(data, expire = defaultExpire) {
        // 更新操作时需要将旧记录删除并将新记录放在最前面
        const oldData = this.get() || [];
        let newData;
        if (Array.isArray(oldData)) {
            // delete the same item
            const index = findIndexByField(oldData, data, uniqueField);
            if (index >= 0) {
                oldData.splice(index, 1);
            }

            // add a new one
            newData = [...oldData, data];
        } else {
            newData = [data];
        }
        this.set(newData, expire);
    },
});

// const withArrayApi = (baseStorage, ...arg) => {
//     baseStorage(...arg);
// }

const Keys = {
    // 可评价房源列表 (如果你对这个名词有疑问，可以去翻prd)
    CAN_COMMENT_RENT_LIST: 'ng_CAN_COMMENT_RENT_LIST',
    // 提醒评价房源队列 (如果你对这个名词有疑问，可以去翻prd)
    REMIND_COMMENT_RENT_QUEUE: 'ng_REMIND_COMMENT_RENT_QUEUE',
    // 上次登录的 用户id (退出登录时设置)
    LAST_LOGIN_USER_ID: 'ng_LAST_LOGIN_USER_ID',
};

export const commentListStorage = generateCacheApi({
    engine: window.localStorage,
    key: Keys.CAN_COMMENT_RENT_LIST,
    validate: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        apartmentId: PropTypes.number.isRequired,
        rentUnitId: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    })).isRequired,
    defaultExpire: null,
    uniqueField: 'rentUnitId',
});

export const commentQueueStorage = generateCacheApi({
    engine: window.localStorage,
    key: Keys.REMIND_COMMENT_RENT_QUEUE,
    validate: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        apartmentId: PropTypes.number.isRequired,
        rentUnitId: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    })).isRequired,
    defaultExpire: null,
    uniqueField: 'rentUnitId',
});

export const lastUserIdStorage = generateCacheApi({
    engine: window.localStorage,
    key: Keys.LAST_LOGIN_USER_ID,
    validate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    defaultExpire: null,
});

export default generateCacheApi;
