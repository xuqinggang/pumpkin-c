import { select } from 'redux-saga/effects';

import history from 'application/App/history';
import { urlPrefixSelector } from './UrlSelector';

const routeChange = (history, to) => {
    history.push(to);
};

export function withHistory(createPath, enhance) {
    return function* withHistoryWrap(...arg) {
        const urlPrefix = yield select(urlPrefixSelector);
        const urlFrg = yield createPath(...arg);
        const urlPath = `${urlPrefix}${urlFrg}`;

        const defaultBeforeRoutes = [];
        const defaultAfterRoutes = [];
        const {
            beforeRouteChange = [],
            afterRouteChange = [],
        } = enhance || {};

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
                tasks[index++](history, urlPath, next);
            }
        }
        next();
    };
}
