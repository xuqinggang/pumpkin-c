import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createBrowserHistory';
import Config from 'config/config';
import Service from 'lib/Service';
import routes from './routes';

// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

// Server配置ajax url前缀
Service.baseConfig = {
    urlPrefix: Config.urlPrefix,
};

injectTapEventPlugin();

render(
    routes(createHistory()),
    document.getElementById('root'),
);
