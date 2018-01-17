import React, { PureComponent } from 'react';
import LogoImg from 'images/App/singleLogo.png';

import AboutUsBack from 'components/App/HouseAboutUs/AboutUsBack/AboutUsBack';

import './styles.less';

const classPrefix = 'm-aboutus';

export default class AboutUs extends PureComponent {
    render() {
        return (
            <div className={`${classPrefix}`}>
                <AboutUsBack />
                <img src={LogoImg} alt="" className={`f-display-inlineblock ${classPrefix}-logo`} />
                <div className={`f-display-inlineblock ${classPrefix}-intro`}>
                    <h2 className="intro-title">简介</h2>
                    <p className="intro-text">
                        南瓜租房是搜狐焦点推出的品牌公寓平台，提供真实、有品质的房源，带来更高效、更省心的租房体验。
                    </p>
                </div>
            </div>
        );
    }
}
