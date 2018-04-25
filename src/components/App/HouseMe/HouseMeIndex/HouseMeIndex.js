import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import MeBack from './MeBack/MeBack';
import MeInfo from './MeInfo/MeInfo';
import MeEntry from './MeEntry/MeEntry';

import './styles.less';

const classPrefix = 'm-housemeindex';

export default class HouseMeIndex extends PureComponent {
    render() {
        const {
            match,
            history,
            meInfoObj,
        } = this.props;

        return (
            <div>
                <MeBack match={match} history={history} className={`${classPrefix}-meback`} />
                <MeInfo className={`${classPrefix}-meinfo`} info={meInfoObj}/>
                <MeEntry match={match} history={history} className={`${classPrefix}-meentry`} />
            </div>
        );
    }
}
