import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createBrowserHistory';
import Config from 'config/config';
import Service from 'lib/Service';
import routes from './routes';
import { execWxShare } from 'lib/wxShare';
// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

execWxShare();

const history = createHistory();
// history.listen((location) => {
//     console.log('isWeiXin', location);
// })

// Server配置ajax url前缀
Service.baseConfig = {
    urlPrefix: Config.urlPrefix,
};

// 自定义数据存储，存放到window上
window.customStore = {};

window.setStore = function (key, dataObj) {
    let keyCorrespondValueObj = window.customStore[key];
    if (!keyCorrespondValueObj) {
        keyCorrespondValueObj = {};
    }

    window.customStore[key] = Object.assign({}, keyCorrespondValueObj, dataObj);
}

window.getStore = function (key) {
    try {
        let keyCorrespondValueObj = window.customStore[key];
        if (!keyCorrespondValueObj) {
            throw new Error('window变量上，没有相应的键值')
        }
        return keyCorrespondValueObj;
    } catch(err) {
        console.error(err);
        return null;
    }
}

// 注册onTouchTap
injectTapEventPlugin();

render(
    routes(history),
    document.getElementById('root'),
);
