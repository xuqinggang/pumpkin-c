import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createBrowserHistory';

import routes from './routes';
import './indexInit';

// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

const history = createHistory();

// 注册onTouchTap
injectTapEventPlugin();

render(
    routes(history),
    document.getElementById('root'),
);
