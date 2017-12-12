import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-housebrief';

export default function HouseBrief(props) {

    const { className, houseBriefData } = props;
    console.log('houseBriefData', houseBriefData);
    return (
        <div className={`${classPrefix} ${className}`}>
            <ul className={`${classPrefix}-list g-grid-row f-flex-justify-start`}>
                <li className={`${classPrefix}-item grid-col grid-col-25 f-flex-justify-center`}>
                    <b className="bold">{houseBriefData.area}</b>m²
                </li>
                <li className={`${classPrefix}-item grid-col grid-col-25 f-flex-justify-center`}>
                    <b className="bold">{houseBriefData.bedroomCount}</b>室<b className="bold">{houseBriefData.livingRoomCount}</b>厅
                </li>
                <li className={`${classPrefix}-item grid-col grid-col-25 f-flex-justify-center`}>
                    <b className="bold">{houseBriefData.floor}</b>/{houseBriefData.totalFloor}层
                </li>
                <li className={`${classPrefix}-item grid-col grid-col-25 f-flex-justify-center`}>
                    <b className="bold">{houseBriefData.direct}</b>
                </li>
            </ul>
        </div>
    )
}
