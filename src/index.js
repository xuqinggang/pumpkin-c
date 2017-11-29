import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createBrowserHistory';
import routes from 'routes';

// 全局样式
import 'styles/index';

injectTapEventPlugin();

render(
    routes(createHistory()),
    document.getElementById('root'),
);
