import React, { PureComponent } from 'react';
import classnames from 'classnames';

import logoImg from 'images/App/logo.png';
import meImg from 'images/App/me.png';
import { isHasCookie, urlJoin } from 'lib/util';
import { isApp } from 'lib/const';

import './styles.less';

const classPrefix = 'm-indexhead';

export default class IndexHead extends PureComponent {
    handleNavigateMe = () => {
        const urlPrefix = window.getStore('url').urlPrefix;

        // 跳转前判断是否登录，利用cookie中是否含有sid判断
        if (isHasCookie('sid')) {
            this.props.history.push(urlJoin(urlPrefix, 'me'));
        } else {
            this.props.history.push(urlJoin(urlPrefix, 'login'));
        }
    }

    handleLogTap = () => {
        window.scrollTo(0, 0);
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
                {
                    isApp() ?
                        null : 
                        <img
                            className={`f-display-flex ${classPrefix}-logo`}
                            src={logoImg}
                            onTouchTap={this.handleLogTap}
                        />
                }
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
