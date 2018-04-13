import { urlJoin } from 'lib/util';

const defaultBeforeRoutes = [];
const defaultAfterRoutes = [
    function pv() {
        window.send_stat_pv && window.send_stat_pv(); // pv
    },
];
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
    const locationSearch = window.location.search;
    const url = `${urlPrefix}${createPath(...arg)}${locationSearch}`;

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

    let goOnFlag = true;
    const next = (goOn) => {
        if (goOn === false) {
            goOnFlag = goOn;
        } else {
            goOnFlag = true;
        }
    };
    tasks.reduce((acc, cur) => {
        if (acc) {
            cur(history, url, next);
        }
        return goOnFlag;
    }, goOnFlag);
};

export default withHistory;
