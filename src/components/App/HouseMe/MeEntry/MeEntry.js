import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-meentry';

export default class MeEntry extends PureComponent {
    render() {
        const {
            className,
        } = this.props;

        return (
            <ul className={classnames(`${classPrefix}`, className)}>
                <Link to="/bj/nangua/me/wish">
                    <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                        <div>
                            <span className="icon-wish-list item-icon"></span>
                            <span className="item-text">心愿单</span>
                        </div>
                        <span className="icon-next item-iconnext"></span>
                    </li>
                </Link>
                <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                    <div>
                        <span className="icon-wish-list item-icon"></span>
                        <span className="item-text">个人信息</span>
                    </div> 
                    <span className="icon-next item-iconnext"></span>
                </li>
                <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                    <div>
                        <span className="icon-wish-list item-icon"></span>
                        <span className="item-text">意见反馈</span>
                    </div> 
                    <span className="icon-next item-iconnext"></span>
                </li>
                <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                    <div>
                        <span className="icon-wish-list item-icon"></span>
                        <span className="item-text">关于我们</span>
                    </div>
                    <span className="icon-next item-iconnext"></span>
                </li>
                <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                    <span className="item-text">退出当前帐号</span>
                    <span className="icon-next item-iconnext"></span>
                </li>
            </ul>
        );
    }
}
