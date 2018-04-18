/* @flow */

import React, { PureComponent } from 'react';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import HitSearch from 'components/App/HouseSearch/HitSearch/HitSearch';
import HistoryRecord from 'components/App/HouseSearch/HistoryRecord/HistoryRecord';

import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';
import { ajaxSearchHits } from './ajaxSearch';

import './styles.less';

const classPrefix = 'm-housesearch';

type StateType = {
    searchData: Object,
};

export default class HouseSearch extends PureComponent<{}, StateType> {
    constructor(props: {}) {
        super(props);

        this.state = {
            searchData: {},
        };
    }

    handleStopPropagation = (e) => {
        e.preventDefault();
        console.log('eee', e);
    }

    onInputChange = (keyword: string) => {
        ajaxSearchHits({
            keyword,
            cityId: 1,
        })
            .then((searchData) => {
                this.setState({
                    searchData: { ...searchData },
                });
            });
    }

    componentWillMount() {
        // 请求position筛选数据
        ajaxInitPositionData()
            .then((positionFilterDataObj) => {
                window.setStore('positionFilterDataObj', { data: positionFilterDataObj });
            });
    }

    render() {
        const {
            searchData,
        } = this.state;

        const {
            history,
        } = this.props;

        return (
            <div
                className={classPrefix}
                onTouchTap={this.handleStopPropagation}
            >
                <div className={`f-display-flex f-flex-align-center ${classPrefix}-head`}>
                    <InputSearch onInputChange={this.onInputChange} />
                    <span className="head-btn-cancel">取消</span>
                </div>
                <HitSearch history={history} />
                <HistoryRecord />
                <SearchList searchData={searchData} />
            </div>
        );
    }
}
