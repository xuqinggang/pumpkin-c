import React from 'react';
import { Router, Switch, Route } from 'react-router';

import routerConfig from './config';
import { urlJoin } from 'lib/util';

const routes = (history) => {
    return (
        <Router
            history={history}
        >
            {
                routerConfig()
            }
        </Router>
    );
};

export const withHistory = (history) => {
    if (!history.push) throw new Error('need react router history');

    // define when call withHistory
    const urlPrefix = window.getStore('url').urlPrefix;

    return (wrappedFunc) => {
        return (...arg) => {
            const locationSearch = window.location.search;
            const url = urlJoin(urlPrefix, wrappedFunc(...arg), `/${locationSearch}`);
            history.push(url);
            // 每次页面发送一次pv请求
            window.send_stat_pv && window.send_stat_pv();
        };
    };
};

export default routes;
