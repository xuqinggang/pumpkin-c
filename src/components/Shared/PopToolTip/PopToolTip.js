import React from 'react';

import './styles.less';

const classPrefix = 'm-poptooltip';

export default function PopToolTip(config) {
    const {
        text,
    } = config;

    // 如果存在则先销毁
    destoryIfExist();

    const divDom = document.createElement('div');
    document.body.appendChild(divDom);

    function destoryIfExist() {
        const tooltipDom = document.querySelector(`.${classPrefix}`);
        if (tooltipDom) {
            close();
        }
    }

    function close() {
        if (!divDom) return;
        const unmountResult = ReactDOM.unmountComponentAtNode(divDom);
        if (unmountResult && divDom.parentNode) {
            divDom.parentNode.removeChild(divDom);
        }
    }

    setTimeout(function() {
        close();
    }, 1600);

    ReactDOM.render(
        <div className={`${classPrefix}`}>{text}</div>
        , divDom);
}
