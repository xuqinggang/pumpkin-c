/* @flow */

import React, { PureComponent } from 'react';

import RecordList from '../RecordList/RecordList';

import { ajaxTopSearches } from 'application/App/HouseSearch/ajaxSearch';

import './styles.less';

const classPrefix = 'm-hitsearch';


type StateType = {
    hitSearchDatatArr: Array<{
        text: string, // 回龙观
        field: string, // circleId
        fieldValue: string, // 6793
    }>,
};

export default class HitSearch extends PureComponent<{}, StateType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hitSearchDatatArr: [],
        };
    }

    componentDidMount() {
        ajaxTopSearches()
            .then((data) => {
                this.setState({
                    hitSearchDatatArr: data.topSearches,
                });
            });
    }

    render() {
        const {
            hitSearchDatatArr,
        } = this.state;

        return (
            <div className={classPrefix}>
                <h2 className={`f-display-inlineblock ${classPrefix}-title`}>热门搜索</h2>
                <RecordList
                    list={hitSearchDatatArr}
                    track={{
                        'data-event-track-click': true,
                        'data-event-track-param-element': 'SEARCH_DEFAULT_POPULAR',
                        'data-event-track-param-page': 'SEARCH',
                        'data-event-track-param-event': 'CLICK',
                    }}
                />
            </div>
        );
    }
}
