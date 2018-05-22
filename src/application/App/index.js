import { hydrate } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';
// import NanguaStatistics from 'nangua-js-statistics';

// const nanguaStatistics = new NanguaStatistics();
// nanguaStatistics.pv('//10.0.120.35:8888/bj/nangua/api/v1/data/statistics', {
//     test: 123,
// });
// nanguaStatistics.listenControlEle('//10.0.120.35:8888/bj/nangua/api/v1/data/statistics');

// 全局样式
import 'styles/index.less';
import 'pumpkin-font-c';

import './store';
import routes from './routes';

const history = createHistory();

// 注册onTouchTap
injectTapEventPlugin();

hydrate(
    routes(history),
    document.getElementById('root'),
);
