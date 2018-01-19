import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import MeBack from 'components/App/HouseMeIndex/MeBack/MeBack';
import MeInfo from 'components/App/HouseMeIndex/MeInfo/MeInfo';
import MeEntry from 'components/App/HouseMeIndex/MeEntry/MeEntry';
import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-housemeindex';

export default class HouseMeIndex extends PureComponent {
    render() {
        const {
            match,
            history,
        } = this.props;

        const meInfoObj = window.getStore('meInfo') || {};

        return (
            <div>
                <MeBack match={match} history={history} className={`${classPrefix}-meback`} />
                <MeInfo className={`${classPrefix}-meinfo`} info={meInfoObj}/>
                <MeEntry match={match} history={history} className={`${classPrefix}-meentry`} />
            </div>
        );
    }
}
