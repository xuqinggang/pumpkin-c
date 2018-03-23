/* @flow */

import React, { PureComponent } from 'react';

import InputSearch from 'Shared/InputSearch/InputSearch';
import SearchList from 'components/App/HouseSearch/SearchList/SearchList';
import HitSearch from 'components/App/HouseSearch/HitSearch/HitSearch';

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

    onInputChange = (keyword: string) => {
        ajaxSearchHits({
            keyword,
            cityId: 1,
        })
            .then((searchData) => {
                this.setState({
                    searchData,
                });
            });
    }

    render() {
        const {
            searchData,
        } = this.state;

        return (
            <div className={classPrefix}>
                <div className={`f-display-flex f-flex-align-center ${classPrefix}-head`}>
                    <InputSearch onInputChange={this.onInputChange} />
                    <span className="head-btn-cancel">取消</span>
                </div>
                <HitSearch />
                <SearchList searchData={searchData} />
            </div>
        );
    }
}
