import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";

import TrafficAround from 'components/Map/TrafficAround/TrafficAround';
// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

import './styles.less';

console.log('xxxmapxxx');

injectTapEventPlugin();

render(
    <div className="m-map">
        map
        <TrafficAround />
    </div>,
    document.getElementById('root'),
);
