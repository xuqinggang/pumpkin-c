import { hydrate } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';

// 全局样式
import 'styles/index.less';
import 'pumpkin-font-c';

import './store';
import './initStore';
import routes from './routes';

const history = createHistory();

// 注册onTouchTap
injectTapEventPlugin();

hydrate(
    routes(history),
    document.getElementById('root'),
);
