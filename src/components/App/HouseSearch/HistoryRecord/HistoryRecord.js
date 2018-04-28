/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import RecordList from '../RecordList/RecordList';

import { historyRecordStorage } from 'application/App/storage';

import './styles.less';

const classPrefix = 'm-historyrecord';

export default class HistoryRecord extends PureComponent<{}> {
    constructor(props) {
        super(props);
        this.state = {
            historyRecordArr: historyRecordStorage.get() || [],
        };
    }

    handleClearHistoryRecord = () => {
        historyRecordStorage.remove();
        this.setState({
            historyRecordArr: [],
        });
    }

    render() {
        const {
            className,
        } = this.props;

        const {
            historyRecordArr,
        } = this.state;

        return (
            historyRecordArr.length ? (
                <div className={classnames(classPrefix, className)}>
                    <div className={`g-grid-row f-flex-justify-between f-flex-align-center ${classPrefix}-head`}>
                        <h2 className={`f-display-inlineblock ${classPrefix}-title`}>历史记录</h2>
                        <span
                            className={`icon-empty ${classPrefix}-icon`}
                            onTouchTap={this.handleClearHistoryRecord}
                        />
                    </div>
                    <RecordList list={historyRecordArr} />
                </div>
            )
            : null
        );
    }
}
