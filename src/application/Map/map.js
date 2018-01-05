import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";

import TrafficAround from 'components/Map/TrafficAround/TrafficAround';
import HeadNavigate from 'components/Map/HeadNavigate/HeadNavigate';
// 全局样式
import 'styles/index';
import 'pumpkin-font-c';

import './styles.less';

const ua = window.navigator.userAgent;
window.isApp = ua.indexOf('FocusLiveApp') !== -1 || ua.indexOf('NanguaApp') !== -1;

injectTapEventPlugin();

render(
    <div className="m-map">
        {
            !window.isApp ?
                <HeadNavigate />
                : null
        }
        <TrafficAround />
    </div>,
    document.getElementById('root'),
);
