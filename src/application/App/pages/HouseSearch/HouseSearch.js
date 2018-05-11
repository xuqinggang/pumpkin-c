/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import TopSearch from 'components/App/HouseSearch/TopSearch/TopSearch';
import HistoryRecord from 'components/App/HouseSearch/HistoryRecord/HistoryRecord';

import { positionFilterSagaActions } from 'reduxs/modules/Filter/FilterPositionRedux';
import { searchSagaActions } from 'reduxs/modules/Search/SearchRedux';
import { topSearchesSelector } from 'reduxs/modules/Search/SearchSelector';
import { historyRecordSetStorage } from 'reduxs/modules/Search/utils';

import { ajaxSearchHits } from './ajaxHouseSearch';
import { debounce } from 'lib/util';

import './styles.less';

const classPrefix = 'm-housesearch';

type StateType = {
    searchHits: Object,
    keyword: string,
};

type PropType = {
    topSearches: [recordItemType],
    topSearchesInit: Function,
};

@connect(state => ({
    topSearches: topSearchesSelector(state),
}), {
    topSearchesInit: searchSagaActions.topSearchesInit,
    sagaSearchUpdate: searchSagaActions.searchUpdate,
    sagaPositionOriginData: positionFilterSagaActions.positionOriginDataInit,
})
export default class HouseSearch extends PureComponent<PropType, StateType> {
    debounceAjaxSearchHits: Function;

    constructor(props: PropType) {
        super(props);

        this.props.sagaPositionOriginData();
        this.props.topSearchesInit();

        this.debounceAjaxSearchHits = debounce(this._ajaxSearchHits, 400, true);
    }

    state = {
        searchHits: {},
        keyword: '',
    };

    _ajaxSearchHits = () => {
        ajaxSearchHits({
            keyword: this.state.keyword,
        })
            .then((searchHits) => {
                this.setState({
                    searchHits: { ...searchHits },
                });
            });
    }

    handleNavigateList = () => {
        // goHouseList(this.props.history)();
    }

    handleStopPropagation = (e: SyntheticEvent<>) => {
        e.preventDefault();
    }

    onInputChange = (keyword: string) => {
        this.setState({
            keyword,
        }, this.debounceAjaxSearchHits);
    }

    handleSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault();
        // setFilterStore({
        //     paramsObj: { keyword: this.keyword },
        // });

        // setSearchStore(this.keyword);
        // // 清空 houseList store
        // window.setStore('houseList', null);
        // goHouseList(this.props.history)();
        //

        // history storage
        // historyRecordSetStorage({
        //     type: 'keywords',
        //     text: this.keyword,
        //     fieldValue: this.keyword,
        // });
    }

    onSearchItemTap = (itemInfo: recordItemType) => {
        // 更新搜索相关(url, params, text(搜索文案))
        console.log('itemInfo', itemInfo);
        this.props.sagaSearchUpdate(itemInfo);
        // history storage
        // historyRecordSetStorage(itemInfo);
    }


    componentWillMount() {
        // // 请求position筛选数据
        // ajaxInitPositionData()
        //     .then((positionFilterDataObj) => {
        //         window.setStore('positionFilterDataObj', { data: positionFilterDataObj });
        //     });
    }

    render() {
        const {
            topSearches,
        } = this.props;

        const {
            searchHits,
        } = this.state;

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
                    {
                        this.state.keyword.length > 0 ?
                            <SearchList
                                onSearchItemTap={this.onSearchItemTap}
                                searchHits={searchHits}
                            />
                            : [
                                <TopSearch
                                    key={0}
                                    onSearchItemTap={this.onSearchItemTap}
                                    topSearches={topSearches}
                                />,
                                <HistoryRecord
                                    key={1}
                                    onSearchItemTap={this.onSearchItemTap}
                                />,
                            ]
                    }
                </div>
            </div>
        );
    }
}
