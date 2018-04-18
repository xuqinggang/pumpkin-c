/* @flow */

import React, { PureComponent } from 'react';

import RecordList from '../RecordList/RecordList';

import { historyRecordStorage } from 'application/App/storage';

import './styles.less';

const classPrefix = 'm-historyrecord';

export default class HistoryRecord extends PureComponent<{}> {
    render() {
        const historyRecordArr = historyRecordStorage.get();

        return (
            <div className={classPrefix}>
                <h2 className={`f-display-inlineblock ${classPrefix}-title`}>历史记录</h2>
                <RecordList list={historyRecordArr} />
            </div>
        );
    }
}
