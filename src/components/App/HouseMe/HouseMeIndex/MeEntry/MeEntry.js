import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { clearCookie, urlJoin } from 'lib/util';
import { lastUserIdStorage } from 'application/App/storage';

import './styles.less';

const classPrefix = 'm-meentry';

export default class MeEntry extends PureComponent {
    // 事件处理程序-退出当前账号点击
    handleLogoutTap = () => {
        clearCookie('sid');

        // 退出登录时，需要将 uid 存到 localStorage
        const meInfo = window.getStore('meInfo');
        if (meInfo) {
            lastUserIdStorage.set(meInfo.uid);
        }

        this.props.history.replace(urlJoin(this.rootUrlPrefix));
    }

    render() {
        const {
            className,
            match,
        } = this.props;

        const {
            url: matchUrl,
        } = match;

        this.rootUrlPrefix = window.getStore('url').urlPrefix;

        return (
            <ul className={classnames(`${classPrefix}`, className)}>
                <Link to={urlJoin(matchUrl, 'wish')}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-wish-list item-icon"></span>
                            <span className="item-text">心愿单</span>
                        </div>
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={urlJoin(matchUrl, 'coupon')}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-my-coupons item-icon"></span>
                            <span className="item-text">我的卡券</span>
                        </div>
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={urlJoin(matchUrl, 'info')}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-user-information item-icon"></span>
                            <span className="item-text">个人信息</span>
                        </div> 
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={urlJoin(matchUrl, 'feedback')}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-feedback item-icon"></span>
                            <span className="item-text">意见反馈</span>
                        </div> 
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={urlJoin(this.rootUrlPrefix, 'about')}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-about-us item-icon"></span>
                            <span className="item-text">关于我们</span>
                        </div>
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <li
                    onTouchTap={this.handleLogoutTap}
                    className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}
                >
                    <span className="item-text">退出当前帐号</span>
                    <span className="icon-next item-iconnext"></span>
                </li>
            </ul>
        );
    }
}
