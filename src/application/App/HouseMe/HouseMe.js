import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import HouseMeIndex from 'components/App/HouseMeIndex/HouseMeIndex';
import HouseMeWish from 'components/App/HouseMeWish/HouseMeWish';
import HouseMeFeedBack from 'components/App/HouseMeFeedBack/HouseMeFeedBack';
import HouseMeInfo from 'components/App/HouseMeInfo/HouseMeInfo';
import { isHasCookie } from 'lib/util';

import './styles.less';

const classPrefix = 'm-houseme';

export default class HouseMe extends PureComponent {
    constructor(props) {
        super(props);

        // this.state = {
        //     // 我的页面，入口类型，默认为首页
        //     // index:首页; wish:心愿单页面; info:个人信息页面
        //     entryType: 'index',
        // };
    }

    componentWillMount() {
        // 进入组件之前判断是否登录
        const {
            cityName,
        } = this.props.match.params;

        if (!isHasCookie('sid')) {
            this.props.history.replace(`/${cityName}/nangua/login`);
        }
    }

    render() {
        const {
            match,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                <Route exact path={match.url} component={HouseMeIndex}/>
                <Route path={`${match.url}/wish`} component={HouseMeWish} />
                <Route path={`${match.url}/info`} component={HouseMeInfo} />
                <Route path={`${match.url}/feedback`} component={HouseMeFeedBack} />
            </div>
        );
    }
}
