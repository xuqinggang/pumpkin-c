/* @flow */

import React, { PureComponent } from 'react';

import RecordList from '../RecordList/RecordList';

import { historyRecordStorage } from 'application/App/storage';

import './styles.less';

const classPrefix = 'm-historyrecord';

type PropType = {
    onSearchItemTap: (item: recordItemType) => void,
};

type StateType = {
    historyRecordArr: [recordItemType],
};

export default class HistoryRecord extends PureComponent<PropType, StateType> {
    state = {
        historyRecordArr: historyRecordStorage.get(),
    };

    handleClearHistoryRecord = () => {
        // historyRecordStorage.remove();
        // this.setState({
        //     historyRecordArr: [],
        // });
    }

    render() {
        const {
            onSearchItemTap,
        } = this.props;

        const {
            historyRecordArr,
        } = this.state;

        return (
            <div className={classPrefix}>
                <div className={`g-grid-row f-flex-justify-between f-flex-align-center ${classPrefix}-head`}>
                    <h2 className={`f-display-inlineblock ${classPrefix}-title`}>历史记录</h2>
                    <span
                        className={`icon-empty ${classPrefix}-icon`}
                        onTouchTap={this.handleClearHistoryRecord}
                    />
                </div>
                <RecordList
                    list={historyRecordArr}
                    onSearchItemTap={onSearchItemTap}
                />
            </div>
        );
    }
}
