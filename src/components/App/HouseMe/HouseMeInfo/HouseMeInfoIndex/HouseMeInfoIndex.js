import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';

import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import HouseMeInfoIndexBack from './HouseMeInfoIndexBack';
import { urlJoin } from 'lib/util';

import './styles.less';

const classPrefix = 'm-meinfoindex';

export default class HouseMeInfoIndex extends PureComponent {
    render() {
        const {
            match,
            history,
            meInfoObj,
        } = this.props;

        const {
            url: matchUrl,
        } = match;


        const {
            nickname,
            phone,
        } = meInfoObj || {};

        return (
            <div className={`${classPrefix}`}>
                <HouseMeInfoIndexBack />
                <ul className={`${classPrefix}-list`}>
                    <Link to={urlJoin(matchUrl, 'editnick')}>
                        <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                            <span className="item-label">昵称</span>
                            <div>
                                <span className="item-value">{nickname}</span>
                                <span className="icon-next item-iconnext"></span>
                            </div>
                        </li>
                    </Link>
                    <Link to={urlJoin(matchUrl, 'edittel')}>
                        <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                            <span className="item-label">手机号</span>
                            <div>
                                <span className="item-value">{phone}</span>
                                <span className="icon-next item-iconnext"></span>
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        )
    }
}

