import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import MeBack from 'components/App/HouseMe/MeBack/MeBack';
import MeInfo from 'components/App/HouseMe/MeInfo/MeInfo';
import MeEntry from 'components/App/HouseMe/MeEntry/MeEntry';
import HouseMeWish from 'application/App/HouseMeWish/HouseMeWish';
console.log('HouseMeWish', HouseMeWish);

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

    // getRouterUrlAndParams(props) {
    //     const { match } = props;
    //     window.setStore('houseMeUrl', {
    //         urlPrefix: match.url,
    //     });
    // }
    // componentWillReceiveProps(nextProps) {
    //     console.log('HouseMe componentWillReceiveProps', nextProps.match.url);
    //     console.log('HouseMe componentWillReceiveProps', this.props.match.url);
    // }
    render() {
        const {
            match,
        } = this.props;
        console.log('123', match.url);

        return (
            <div className={`${classPrefix}`}>
                <Route exact path={match.url} component={HouseMeIndex}/>
                <Route path={`${match.url}/wish`} component={HouseMeWish} />
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
