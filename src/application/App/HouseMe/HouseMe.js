import React, { PureComponent } from 'react';
import { withRouter, Route } from 'react-router';

import HouseMeIndex from 'components/App/HouseMe/HouseMeIndex/HouseMeIndex';
import HouseMeWish from 'components/App/HouseMe/HouseMeWish/HouseMeWish';
import HouseMeFeedBack from 'components/App/HouseMe/HouseMeFeedBack/HouseMeFeedBack';
import HouseMeInfo from 'components/App/HouseMe/HouseMeInfo/HouseMeInfo';
import HouseMeCoupon from 'components/App/HouseMe/HouseMeCoupon/HouseMeCoupon';
import LoginRequiredConnect from 'Shared/LoginRequiredConnect/LoginRequiredConnect';

import { goLogin } from 'application/App/routes/routes';
import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import { isApp, isRmHead } from 'lib/const';

import './styles.less';

const classPrefix = 'm-houseme';

@LoginRequiredConnect()
export default class HouseMe extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            meInfoObj: {},
        };
    }

    componentWillMount() {
        const meInfoStore = window.getStore('meInfo');
        if (meInfoStore) {
            this.setState({
                meInfoObj: meInfoStore 
            });

            return ;
        }

        ajaxGetMeInfo()
            .then((meInfoObj) => {
                window.setStore('meInfo', meInfoObj);

                this.setState({
                    meInfoObj,
                });
            })
            .catch((err) => {
                goLogin(this.props.history)();
            })
    }

    componentDidMount() {
        if (isApp() && isRmHead()) {
            this.wrapperDom.style.paddingTop = '0px';
        }
    }

    render() {
        const {
            match,
            history,
        } = this.props;

        const meInfoObj = window.getStore('meInfo') || {};

        return (
            <div className={`${classPrefix}`} ref={(dom) => { this.wrapperDom = dom; }}>
                <Route exact path={match.url}
                    render={(props) => {
                        return (
                            <HouseMeIndex
                                { ...props }
                                meInfoObj={meInfoObj}
                            />
                        );
                    }}
                />
                <Route exact path={`${match.url}/wish`} component={HouseMeWish} />
                <Route path={`${match.url}/info`}
                    render={(props) => {
                        return (
                            <HouseMeInfo
                                {...props}
                                meInfoObj={meInfoObj}
                            />
                        );
                    }}
                />
                <Route exact path={`${match.url}/feedback`} component={HouseMeFeedBack} />
                <Route exact path={`${match.url}/coupon`} component={HouseMeCoupon} />
            </div>
        );
    }
}
