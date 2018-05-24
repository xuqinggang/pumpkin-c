import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-housetraffic';

export default function HouseTraffic(props) {
    const { className, houseTrafficData } = props;
    const { lon, lat } = houseTrafficData;
    if (!lon || !lat) return null;

    const pos = `${lon},${lat}`;
    // 中心点图片url
    const markerImgUrl = 'http://pic.kuaizhan.com/g3/a8/2f/cc39-9739-4af0-8142-6b440a6ff6fa15?id=1.png';
    // 目前房源位置图片
    const curHousePtImg = `//restapi.amap.com/v3/staticmap?location=${pos}&zoom=17&scale=1&traffic=1&size=690*388&markers=-1,${markerImgUrl},0:${pos}&key=94989938b48570eb626c27fbe88df72f`;

    return (
        <div className={`${classPrefix} ${className}`}>
            <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>周边及交通</h1>
            <div className={`${classPrefix}-img-wrap`}>
                <a
                    className="f-display-inlineblock"
                    href="javascript:void(0)"
                    onTouchTap={handleJumpPageTap}
                    data-event-track-click
                    data-event-track-param-element="DETAIL_TRAFFIC_MAP"
                    data-event-track-param-page="HOUSE_DETAIL"
                    data-event-track-param-event="CLICK"
                >
                    <img src={curHousePtImg} className={`f-display-inlineblock ${classPrefix}-img`} alt="" />
                </a>
            </div>
        </div>
    );

    function handleJumpPageTap() {
        const urlInfo = window.getStore('url');
        const urlPrefix = urlInfo && urlInfo.urlPrefix;

        window.location.href = `${urlPrefix}/map?pos=${pos}`;
    }
}
