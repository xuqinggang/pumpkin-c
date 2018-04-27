/* @flow */

import React, { PureComponent } from 'react';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import HitSearch from 'components/App/HouseSearch/HitSearch/HitSearch';
import HistoryRecord from 'components/App/HouseSearch/HistoryRecord/HistoryRecord';

import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';
import { ajaxSearchHits } from './ajaxSearch';
import { goHouseList } from 'application/App/routes/routes';
import { setFilterStore, setSearchStore } from './transId';
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
        setFilterStore({
            paramsObj: { keyword: this.state.keyword },
        });

        setSearchStore(this.state.keyword);
        // 清空 houseList store
        window.setStore('houseList', null);
        goHouseList(this.props.history)();
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
                            onInputChange={this.onInputChange}
                            placeholder="区域、小区、商圈、地铁站、地址"
                            maxLength={50}
                        />
                    </form>
                    <span className="head-btn-cancel" onTouchTap={this.handleNavigateList}>取消</span>
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
                                    <HistoryRecord />
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}
