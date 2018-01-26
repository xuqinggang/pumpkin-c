import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import HouseMeIndex from 'components/App/HouseMeIndex/HouseMeIndex';
import HouseMeWish from 'components/App/HouseMeWish/HouseMeWish';
import HouseMeFeedBack from 'components/App/HouseMeFeedBack/HouseMeFeedBack';
import HouseMeInfo from 'components/App/HouseMeInfo/HouseMeInfo';

import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import { isHasCookie } from 'lib/util';

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
        // 进入组件之前判断是否登录
        if (!isHasCookie('sid')) {
            this.props.history.replace(`${this.urlPrefix}/login`);
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
                this.setState({
                    meInfoObj,
                });

                window.setStore('meInfo', meInfoObj);
            })
    }

    render() {
        const {
            match,
            history,
        } = this.props;
        const {
            meInfoObj,
        } = this.state;

        console.log('meInfoObj', this.state.meInfoObj);

        return (
            <div className={`${classPrefix}`}>
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
            </div>
        );
    }
}
