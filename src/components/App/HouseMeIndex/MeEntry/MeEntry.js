import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { clearCookie } from 'lib/util';

import './styles.less';

const classPrefix = 'm-meentry';

export default class MeEntry extends PureComponent {
    handleExitTap = () => {
        console.log('handleExitTap');
        clearCookie('sid');
        // this.props.history.push(this.rootUrlPrefix);
    }
    render() {
        const {
            className,
            match,
        } = this.props;

        const {
            url: matchUrl,
        } = match;

        // url路径去掉me字段 (/bj/nangua/me => /bj/nangua)
        // 根url前缀 /bj/nangua
        this.rootUrlPrefix = matchUrl.substr(0, matchUrl.indexOf('/me'));

        return (
            <ul className={classnames(`${classPrefix}`, className)}>
                <Link to={`${matchUrl}/wish`}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-wish-list item-icon"></span>
                            <span className="item-text">心愿单</span>
                        </div>
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={`${matchUrl}/info`}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-wish-list item-icon"></span>
                            <span className="item-text">个人信息</span>
                        </div> 
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={`${matchUrl}/feedback`}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-wish-list item-icon"></span>
                            <span className="item-text">意见反馈</span>
                        </div> 
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <Link to={`${this.rootUrlPrefix}/about`}>
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-wish-list item-icon"></span>
                            <span className="item-text">关于我们</span>
                        </div>
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <li
                    onTouchTap={this.handleExitTap}
                    className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}
                >
                    <span className="item-text">退出当前帐号</span>
                    <span className="icon-next item-iconnext"></span>
                </li>
            </ul>
        );
    }
}
