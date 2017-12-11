import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";

import TrafficAround from 'components/Map/TrafficAround/TrafficAround';
import HeadNavigate from 'components/Map/HeadNavigate/HeadNavigate';
// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

import './styles.less';

injectTapEventPlugin();

render(
    <div className="m-map">
        <HeadNavigate />
        <TrafficAround />
    </div>,
    document.getElementById('root'),
);
