import React, { PureComponent } from 'react';

import MeBack from 'components/App/HouseMeIndex/MeBack/MeBack';
import MeInfo from 'components/App/HouseMeIndex/MeInfo/MeInfo';
import MeEntry from 'components/App/HouseMeIndex/MeEntry/MeEntry';

import './styles.less';

const classPrefix = 'm-housemeindex';

export default class HouseMeIndex extends PureComponent {
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
