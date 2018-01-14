import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import MeBack from 'components/App/HouseMe/MeBack/MeBack';
import MeInfo from 'components/App/HouseMe/MeInfo/MeInfo';
import MeEntry from 'components/App/HouseMe/MeEntry/MeEntry';
import HouseMeWish from 'application/App/HouseMeWish/HouseMeWish';
import HouseMeFeedBack from 'application/App/HouseMeFeedBack/HouseMeFeedBack';
import { isHasCookie } from 'lib/util';

import './styles.less';

const classPrefix = 'm-houseme';

class HouseMe extends PureComponent {
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
                <Route path={`${match.url}/feedback`} component={HouseMeFeedBack} />
            </div>
        );
    }
}

class HouseMeIndex extends PureComponent {
    render() {
        return (
            <div>
                <MeBack className={`${classPrefix}-meback`} />
                <MeInfo className={`${classPrefix}-meinfo`} />
                <MeEntry className={`${classPrefix}-meentry`} />
            </div>
        )
    }
}
export default withRouter(HouseMe);
