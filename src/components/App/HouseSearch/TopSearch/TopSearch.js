/* @flow */

import React, { PureComponent } from 'react';

import RecordList from '../RecordList/RecordList';

import './styles.less';

const classPrefix = 'm-topsearch';

type PropType = {
    topSearches: [recordItemType],
    onSearchItemTap: (item: recordItemType) => void,
};

export default class TopSearch extends PureComponent<PropType> {
    render() {
        const {
            topSearches,
            onSearchItemTap,
        } = this.props;

        return (
            <div className={classPrefix}>
                <h2 className={`f-display-inlineblock ${classPrefix}-title`}>热门搜索</h2>
                <RecordList
                    list={topSearches}
                    onSearchItemTap={onSearchItemTap}
                />
            </div>
        );
    }
}
