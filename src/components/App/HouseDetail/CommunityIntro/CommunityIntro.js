import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-communityintro';

const IntroTextMap = {
    constructType: '建筑类型',
    greenRate: '绿化率',
    openYear: '建筑年代',
    propertyType: '物业类型',
};

// this.state = {
//     intro: {
//         constructType: '塔板结合',
//         openYear: '1972',
//         greenRate: '33%',
//     };
// };

export default function CommunityIntro(props) {
    const { className, communityIntroData } = props;
    console.log('communityIntroData', communityIntroData)

    const introChildren = Object.keys(communityIntroData).map((introType, index) => {
        return (
            <li key={index}>
                <span className={`${classPrefix}-item-value f-display-block`}>{communityIntroData[introType]}</span>
                <span className={`${classPrefix}-item-type f-display-block`}>{IntroTextMap[introType]}</span>
            </li>
        );
    });

    return (
        <div className={`${classPrefix} ${className}`}>
            <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>小区介绍</h1>
            <ul className={`${classPrefix}-intro g-grid-row f-flex-justify-between`}>
                {
                    introChildren
                }
            </ul>
        </div>
    )
}
