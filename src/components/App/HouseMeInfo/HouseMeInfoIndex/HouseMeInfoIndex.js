import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';

import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import HouseMeInfoIndexBack from './HouseMeInfoIndexBack';

import './styles.less';

const classPrefix = 'm-meinfoindex';

export default class HouseMeInfoIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            infoObj: {},
        };
    }

    componentWillMount() {
        const infoObj = window.getStore('meInfo');
        if (infoObj) {
            this.setState({
                infoObj,
            });
        } else {
            ajaxGetMeInfo()
                .then((infoObj) => {
                    this.setState({
                        infoObj,
                    });
                })
        }
    }

    render() {
        const {
            match,
            history,
        } = this.props;

        const {
            nickname,
            phone,
        } = this.state.infoObj;

        const {
            url: matchUrl,
        } = match;

        return (
            <div className={`${classPrefix}`}>
                <HouseMeInfoIndexBack />
                <ul className={`${classPrefix}-list`}>
                    <Link to={`${matchUrl}/editnick`}>
                        <li className={`${classPrefix}-item  g-grid-row f-flex-justify-between f-flex-align-center`}>
                            <span className="item-label">昵称</span>
                            <div>
                                <span className="item-value">{nickname}</span>
                                <span className="icon-next item-iconnext"></span>
                            </div>
                        </li>
                    </Link>
                    <Link to={`${matchUrl}/edittel`}>
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

