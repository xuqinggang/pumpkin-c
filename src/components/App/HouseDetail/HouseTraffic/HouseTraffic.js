import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-housetraffic';

export default function HouseTraffic(props) {
    const { className, houseTrafficData } = props;
    const { lon, lat } = houseTrafficData;
    if (!lon || !lat) return null;
    const pos = `${lon},${lat}`;
    // 目前房源位置图片
    const curHousePtImg = `//restapi.amap.com/v3/staticmap?location=${pos}&zoom=17&scale=1&traffic=1&size=690*388&labels=%E6%88%BF%E6%BA%90,2,1,30,0xFFFFFF,0xFF0000:${pos}&markers=large,0xFF0000,A:${pos}&key=94989938b48570eb626c27fbe88df72f`;

    return (
        <div className={`${classPrefix} ${className}`}>
            <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>周边及交通</h1>
            <div className={`${classPrefix}-img-wrap`}>
                <a href={`/map.html?pos=${pos}`}>
                    <img src={curHousePtImg} className={`f-display-inlineblock ${classPrefix}-img`} alt="" />
                </a>
            </div>
        </div>
    )
}
