import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-communityintro';

const IntroTextMap = {
    constructType: '建筑类型',
    openYear: '建筑年代',
    greenRate: '绿化率',
};

class CommunityIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: {
                constructType: '塔板结合',
                openYear: '1972',
                greenRate: '33%',
            }
        };
    }
    renderIntro() {
        const communityIntro = this.state.intro;
        return Object.keys(communityIntro).map((introType, index) => {
            return (
                <li>
                    <span className={`${classPrefix}-item-value f-display-block`}>{communityIntro[introType]}</span>
                    <span className={`${classPrefix}-item-type f-display-block`}>{IntroTextMap[introType]}</span>
                </li>
            )
        })
    }
    render() {
        const { className } = this.props;
        return (
            <div className={`${classPrefix} ${className}`}>
                <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>小区介绍</h1>
                <ul className={`${classPrefix}-intro g-grid-row f-flex-justify-between`}>
                    {
                        this.renderIntro()
                    }
                </ul>
            </div>
        )
    }
}

export default CommunityIntro;
