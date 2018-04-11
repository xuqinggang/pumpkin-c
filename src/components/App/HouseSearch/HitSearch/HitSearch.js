/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import RecordList from '../RecordList/RecordList';

import { goHouseList } from 'application/App/routes/routes';
import { parsePositionSearchToFilterInfo } from 'application/App/HouseSearch/transId';
import { FILTER_SEPARATOR } from 'application/App/HouseList/transState';
import { ajaxTopSearches } from 'application/App/HouseSearch/ajaxSearch';

import './styles.less';

const classPrefix = 'm-hitsearch';

function setFilterStore({type, urlFrg, state, label, paramsObj}) {
    const filterStore = window.getStore('filter');
    const {
        state: oldState,
        label: oldLabel,
        paramsObj: oldParamsObj,
        urlFrg: oldUrlFrg,
    } = filterStore || {};

    window.setStore('filter', {
        state: Object.assign({}, oldState, { [type]: state }),
        label: Object.assign({}, oldLabel, { [type]: label }),
        paramsObj: Object.assign({}, oldParamsObj, paramsObj),
        urlFrg: Object.assign({}, oldUrlFrg, { [type]: urlFrg }),
    });
}

function jumpHouseList(history) {
    const filterStore = window.getStore('filter');
    const {
        urlFrg = {},
    } = filterStore || {};

    const urlArr = [];
    Object.keys(urlFrg).forEach((type) => {
        const urlFrgVal = urlFrg[type];
        urlFrgVal && urlArr.push(urlFrgVal);
    });
    const url = urlArr.join(FILTER_SEPARATOR);
    window.setStore('url', {
        filterUrlFragment: url,
    });

    goHouseList(history)();
}

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

    handlePositionSearchTap = (data) => {
        const {
            type,
            text,
            superField,
            superFieldValue,
            field,
            fieldValue,
        } = data;

        // filterInfo = {urlFrg, label, state, paramsObj}
        const filterInfo = parsePositionSearchToFilterInfo({superField, superFieldValue, field, fieldValue});

        setFilterStore({
            type: 'position',
            ...filterInfo,
        });

        jumpHouseList(this.props.history);
    }

    componentDidMount() {
        ajaxTopSearches({
            cityId: 1,
        })
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

        const {
        } = this.props;

        return (
            <div className={classPrefix}>
                <h2 className={`f-display-inlineblock ${classPrefix}-title`}>热门搜索</h2>
                <RecordList list={hitSearchDatatArr} onSearchTap={this.handlePositionSearchTap}/>
            </div>
        );
    }
}
