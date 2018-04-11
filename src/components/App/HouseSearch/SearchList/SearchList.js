/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import SearchBlock from '../SearchBlock/SearchBlock';

import {
    parsePositionSearchToFilterInfo,
    jumpHouseList,
    setFilterStore,
} from 'application/App/HouseSearch/transId';

import './styles.less';

const classPrefix = 'm-searchlist';

type PropType = {
    className?: string,
    searchData: Object,
};

// 区域对应的title文案
const TypeMapTitle = {
    apartments: '优质公寓',
    districts: '区域',
    subways: '地铁',
    circles: '商圈',
    blocks: '小区',
    addresses: '地址',
}

export default class SearchList extends PureComponent<PropType> {
    onOtherSearchItemTap = () => {

    }
    onPositionSearchItemTap = (data) => {
        console.log('data', data);
    }
    onSeachItemTap = () => {

    }

    renderChildren() {
        const {
            searchData = {},
        } = this.props;

        const childrenArr = [];
        Object.keys(searchData).forEach((type, index) => {
            const searchDataArr = searchData[type];
            searchDataArr && searchDataArr.length && childrenArr.push(
                <SearchBlock
                    key={index}
                    searchDataArr={searchData[type]}
                    title={TypeMapTitle[type]}
                    type={type}
                    onPositionSearchItemTap={this.onPositionSearchItemTap}
                    onOtherSearchItemTap={this.onOtherSearchItemTap}
                />
            );
        });

        return childrenArr;
    }

    render() {
        return (
            <div>
                {
                    this.renderChildren()
                }
            </div>
        );
    }
}
