import { urlJoin } from 'lib/util';

const defaultBeforeRoutes = [];
const defaultAfterRoutes = [];

const routeChange = (history, to) => {
    history.push(to);
};

const withHistory = (createPath, enhance) => history => (...arg) => {
    if (!history.push) throw new Error('need react router history');
    const {
        beforeRouteChange = [],
        afterRouteChange = [],
    } = enhance || {};

    // define when call withHistory
    const { urlPrefix } = window.getStore('url');
    const url = `${urlPrefix}${createPath(...arg)}`;

    const beforeTasks = Array.isArray(beforeRouteChange)
        ? beforeRouteChange
        : [beforeRouteChange];
    const afterTasks = Array.isArray(afterRouteChange)
        ? afterRouteChange
        : [afterRouteChange];
    const tasks = [
        ...defaultBeforeRoutes,
        ...beforeTasks,
        routeChange,
        ...afterTasks,
        ...defaultAfterRoutes,
    ];

    // tasks按中间件方式执行
    let index = 0;
    function next() {
        if (index < tasks.length) {
            tasks[index++](history, url, next);
        }
    }
    next();
};

export default withHistory;
