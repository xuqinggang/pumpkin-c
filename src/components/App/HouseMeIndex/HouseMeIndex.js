import React, { PureComponent } from 'react';

import MeBack from 'components/App/HouseMeIndex/MeBack/MeBack';
import MeInfo from 'components/App/HouseMeIndex/MeInfo/MeInfo';
import MeEntry from 'components/App/HouseMeIndex/MeEntry/MeEntry';
import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-housemeindex';

export default class HouseMeIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 个人信息
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
        } = this.props;

        const {
            infoObj,
        } = this.state;

        return (
            <div>
                <MeBack className={`${classPrefix}-meback`} />
                <MeInfo className={`${classPrefix}-meinfo`} info={infoObj}/>
                <MeEntry match={match} history={history} className={`${classPrefix}-meentry`} />
            </div>
        );
    }
}
