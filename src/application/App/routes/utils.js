import { urlJoin } from 'lib/util';

const defaultBeforeRoutes = [];
const defaultAfterRoutes = [];

const routeChange = (history, to) => {
    history.push(to);
};

const replaceRouteChange = (history, to) => {
    history.replace(to);
};

const withHistory = (createPath, enhance, isReplace = false) => history => (...arg) => {
    if (!history.push) throw new Error('need react router history');
    const {
        beforeRouteChange = [],
        afterRouteChange = [],
    } = enhance || {};

    // define when call withHistory
    const { urlPrefix } = window.getStore('url');

    // url can be change, like add a search
    let url = `${urlPrefix}${createPath(...arg)}`;

    const beforeTasks = Array.isArray(beforeRouteChange)
        ? beforeRouteChange
        : [beforeRouteChange];
    const afterTasks = Array.isArray(afterRouteChange)
        ? afterRouteChange
        : [afterRouteChange];
    const tasks = [
        ...defaultBeforeRoutes,
        ...beforeTasks,
        isReplace ? replaceRouteChange : routeChange,
        ...afterTasks,
        ...defaultAfterRoutes,
    ];

    // tasks按中间件方式执行
    let index = 0;
    function next(newUrl) {
        if (newUrl) {
            url = newUrl;
        }
        if (index < tasks.length) {
            tasks[index++](history, url, next);
        }
    }
    next(url);
};

export default withHistory;

/**
 * @param {String} qs 'a=b&c=d'
 * @returns {Object} {a: 'b', c: 'd'}
 */
export const queryStringToObject = (qs) => {
    const qsArr = qs.split('&');
    const qsObj = {};
    qsArr.forEach((qsItem) => {
        const [name, value] = qsItem.split('=');
        qsObj[name] = value;
    });
    return qsObj;
};

export const generateUrl = (baseUrl, query) => {
    return `${baseUrl}?${JSON.stringify(query).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, "&")}`;
};
