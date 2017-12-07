import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-housebrief';

export default function HouseBrief(props) {

    const { className, houseBriefArrData } = props;

    return (
        <div className={`${classPrefix} ${className}`}>
            <ul className={`${classPrefix}-list g-grid-row f-flex-justify-start`}>
                {
                    houseBriefArrData.map((info, index) => {
                        return (
                            <li key={index} className={`${classPrefix}-item grid-col grid-col-25 f-flex-justify-center`}>
                                <span className={`u-tag-gray`}>{info}</span>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
