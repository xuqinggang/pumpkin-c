import React, { PureComponent } from 'react';
import { withRouter, Route } from 'react-router';

import HouseMeIndex from 'components/App/HouseMe/HouseMeIndex/HouseMeIndex';
import HouseMeWish from 'components/App/HouseMe/HouseMeWish/HouseMeWish';
import HouseMeFeedBack from 'components/App/HouseMe/HouseMeFeedBack/HouseMeFeedBack';
import HouseMeInfo from 'components/App/HouseMe/HouseMeInfo/HouseMeInfo';
import HouseMeCoupon from 'components/App/HouseMe/HouseMeCoupon/HouseMeCoupon';

import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import { isHasCookie, setCookie, urlJoin } from 'lib/util';
import { isApp, isRmHead } from 'lib/const';

import './styles.less';

const classPrefix = 'm-houseme';

export default class HouseMe extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            meInfoObj: {},
        };

        this.urlPrefix = window.getStore('url').urlPrefix;
    }

    componentWillMount() {
        alert('isRmHead'+isRmHead+isApp);
        // 向app中注入cookie
        if (isApp && isRmHead) {
            let sidVal = null;
            if (window.iOS && iOS.getSessionId) {
                sidVal = iOS.getSessionId();
                alert('sidVal'+sidVal);
            }
            if (window.android && android.getSessionId) {
                sidVal = android.getSessionId();
            }
            sidVal && setCookie('sid', sidVal);
        }

        // 进入组件之前判断是否登录
        if (!isHasCookie('sid')) {
            this.props.history.replace(urlJoin(this.urlPrefix, 'login'));
        }

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
                this.props.history.replace(urlJoin(this.urlPrefix, 'login'));
            })
    }

    componentDidMount() {
        if (isApp && isRmHead) {
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
