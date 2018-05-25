import { hydrate } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin-fix';
import createHistory from 'history/createBrowserHistory';
import nanguaPv from 'lib/nanguaPv';

// 全局样式
import 'styles/index.less';
import 'pumpkin-font-c';

import './store';
import routes from './routes';

const history = createHistory();

nanguaPv.pvByInterval();
nanguaPv.pvByRoute();
history.listen(() => {
    // nangauPv
    nanguaPv.pvByRoute();
});

// 注册onTouchTap
injectTapEventPlugin();

hydrate(
    routes(history),
    document.getElementById('root'),
);
