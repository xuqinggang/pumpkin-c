/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import HitSearch from 'components/App/HouseSearch/HitSearch/HitSearch';
import HistoryRecord from 'components/App/HouseSearch/HistoryRecord/HistoryRecord';

import { searchSagaActions } from 'reduxs/modules/Search/SearchRedux';

import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';
import { ajaxSearchHits } from './ajaxSearch';
import { goHouseList } from 'application/App/routes/routes';
import { setFilterStore, setSearchStore } from './transId';

import './styles.less';

const classPrefix = 'm-housesearch';

type StateType = {
    searchData: Object,
};

@connect((state) => ({
    topSearches: topSearchesSelector(state),
}), {
    sagaSearchKeywordAdd: searchSagaActions.searchKeywordAdd,
})
export default class HouseSearch extends PureComponent<{}, StateType> {
    constructor(props: {}) {
        super(props);

        this.state = {
            searchData: {},
        };
        this.keyword = '';
    }

    handleNavigateList = () => {
        goHouseList(this.props.history)();
    }

    handleStopPropagation = (e) => {
        e.preventDefault();
    }

    onInputChange = (keyword: string) => {
        this.keyword = keyword;

        ajaxSearchHits({
            keyword,
        })
            .then((searchData) => {
                this.setState({
                    searchData: { ...searchData },
                });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        setFilterStore({
            paramsObj: { keyword: this.keyword },
        });

        setSearchStore(this.keyword);
        // 清空 houseList store
        window.setStore('houseList', null);
        goHouseList(this.props.history)();
    }

    onSearchItemTap = (type, data) => {

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
            >
                <div className={`f-display-flex f-flex-align-center ${classPrefix}-head`}>
                    <form onSubmit={this.handleSubmit}>
                        <InputSearch onInputChange={this.onInputChange} />
                    </form>
                    <span className="head-btn-cancel" onTouchTap={this.handleNavigateList}>取消</span>
                </div>
                <div
                    onTouchTap={this.handleStopPropagation}
                >
                    <HitSearch
                        onSearchItemTap={this.onSearchItemTap}
                        topSearches={topSearches}
                    />
                    <HistoryRecord
                        onSearchItemTap={this.onSearchItemTap}
                    />
                    <SearchList searchData={searchData} />
                </div>
            </div>
        );
    }
}
