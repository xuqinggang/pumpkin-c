import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createHashHistory';
import routes from './routes';

// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

injectTapEventPlugin();

render(
    routes(createHistory()),
    document.getElementById('root'),
);
