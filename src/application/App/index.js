import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';

import configureStore from './reduxs/configureStore';

// redux store
const store = configureStore();

// 全局样式
import 'styles/index.less';
import 'pumpkin-font-c';

import './store';
import routes from './routes';

const history = createHistory();

// 注册onTouchTap
injectTapEventPlugin();

hydrate(
    <Provider store={store}>
        { routes(history) }
    </Provider>,
    document.getElementById('root'),
);
