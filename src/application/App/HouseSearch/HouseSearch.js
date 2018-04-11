/* @flow */

import React, { PureComponent } from 'react';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import HitSearch from 'components/App/HouseSearch/HitSearch/HitSearch';

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

    componentWillMount() {
        // 请求position筛选数据
        ajaxInitPositionData()
            .then((positionFilterDataObj) => {
                window.setStore('positionFilterDataObj', { data: positionFilterDataObj });
            });
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

    render() {
        const {
            searchData,
        } = this.state;

        const {
            history,
        } = this.props;

        return (
            <div className={classPrefix}>
                <div className={`f-display-flex f-flex-align-center ${classPrefix}-head`}>
                    <InputSearch onInputChange={this.onInputChange} />
                    <span className="head-btn-cancel">取消</span>
                </div>
                <HitSearch history={history} />
                <SearchList searchData={searchData} />
            </div>
        );
    }
}
