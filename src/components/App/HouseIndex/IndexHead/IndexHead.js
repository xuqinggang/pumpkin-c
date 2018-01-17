import React, { PureComponent } from 'react';
import classnames from 'classnames';

import logoImg from 'images/App/logo.png';
import meImg from 'images/App/me.png';
import { isHasCookie } from 'lib/util';

import './styles.less';

const classPrefix = 'm-indexhead';

export default class IndexHead extends PureComponent {

    handleNavigateMe = () => {
        const {
            cityName,
        } = this.props.match.params;

        // 跳转前判断是否登录，利用cookie中是否含有sid判断
        if (isHasCookie('sid')) {
            this.props.history.push(`/${cityName}/nangua/me`);
        } else {
            this.props.history.push(`/${cityName}/nangua/login`);
        }
    }

    render() {
        const {
            className,
        } = this.props;

        return (
            <div className={classnames('g-grid-row f-flex-justify-between f-flex-align-center', classPrefix, className)}>
                <div className={`f-display-flex f-flex-align-center ${classPrefix}-location`}>
                    <span className="f-vertical-middle location-text">北京</span>
                    <span className={`f-vertical-middle icon-pull-down location-downicon`}></span>
                </div>
                <img className={`f-display-flex ${classPrefix}-logo`} src={logoImg} alt="" />
                <a 
                    href="javascript:void(0)"
                    className={`f-dispaly-inlineblock ${classPrefix}-me-wrap`}
                    onTouchTap={this.handleNavigateMe}
                >
                    <img className={`f-display-flex ${classPrefix}-me`} src={meImg} alt="" />
                </a> 
            </div>
        );
    }
}
