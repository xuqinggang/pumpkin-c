/* @flow */

import React, { PureComponent } from 'react';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import HitSearch from 'components/App/HouseSearch/HitSearch/HitSearch';
import HistoryRecord from 'components/App/HouseSearch/HistoryRecord/HistoryRecord';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';

import { historyRecordStorage } from 'application/App/storage';
import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';
import { ajaxSearchHits } from './ajaxSearch';
import { goHouseList } from 'application/App/routes/routes';
import { setFilterStore, setSearchStore, clearOtherFilter, clearPositionFilter, jumpHouseList } from './transId';
import nanguaPv from 'lib/nanguaPv';

import { debounce } from 'lib/util';

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
            keyword: '',
        };
        this.debounceAjaxSearchHits = debounce(this._ajaxSearchHits, 400, true);
    }

    handleNavigateList = () => {
        goHouseList(this.props.history)();
    }

    handleStopPropagation = (e) => {
        e.preventDefault();
    }

    onInputChange = (keyword: string) => {
        this.setState({
            keyword,
        }, this.debounceAjaxSearchHits);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.keyword === '') {
            PopToolTip({text: '搜索关键字不能为空'});
            return;
        }

        // nanguaPv 统计
        nanguaPv.pv({
            keywordSource: '直接搜索',
            searchKeyword: this.state.keyword,
            keywordType: '未知',
            page: 'SEARCH',
            element: 'SEARCH_COUNT',
            event: 'CLICK',
        });

        // 清空 store
        window.setStore('houseList', null);
        clearPositionFilter();
        clearOtherFilter();
        
        // storage
        historyRecordStorage.update({
            type: 'keywords',
            text: this.state.keyword,
            fieldValue: this.state.keyword,
        });

        setFilterStore({
            paramsObj: { keyword: this.state.keyword },
        });

        setSearchStore(this.state.keyword);
        jumpHouseList(this.props.history);
    }

    _ajaxSearchHits = () => {
        ajaxSearchHits({
            keyword: this.state.keyword,
        })
            .then((searchData) => {
                console.log('ajaxSearchHits', searchData);
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
            >
                <div className={`f-display-flex f-flex-align-center ${classPrefix}-head`}>
                    <form onSubmit={this.handleSubmit}>
                        <InputSearch
                            autofocus
                            onInputChange={this.onInputChange}
                            placeholder="区域、小区、商圈、地铁站、地址"
                            maxLength={50}
                            track={{
                                'data-event-track-click': true,
                                'data-event-track-param-element': 'SEARCH_PROMPT_CLEAN_FRAME',
                                'data-event-track-param-page': 'INDEX_HOUSE',
                                'data-event-track-param-event': 'CLICK',
                            }}
                        />
                    </form>
                    <span
                        className="head-btn-cancel"
                        onTouchTap={this.handleNavigateList}
                        data-event-track-click
                        data-event-track-param-element="SEARCH_DEFAULT_CANCEL"
                        data-event-track-param-page="SEARCH"
                        data-event-track-param-event="CLICK"
                    >
                        取消
                    </span>
                </div>
                <div
                    onTouchTap={this.handleStopPropagation}
                >
                    {
                        this.state.keyword.length ?
                            <SearchList searchData={searchData} />
                            : (
                                <div>
                                    <HitSearch history={history} />
                                    <HistoryRecord className={`${classPrefix}-historyrecord`} />
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}
