import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createHashHistory';

// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

injectTapEventPlugin();

render(
    <div>map</div>,
    document.getElementById('root'),
);
