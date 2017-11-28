import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import routes from 'routes';
// 全局样式
import 'styles/index';

render(
    routes(createHistory()),
    document.getElementById('root'),
);
