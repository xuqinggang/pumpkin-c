/* @flow */

import React, { PureComponent } from 'react';

import SearchBlock from '../SearchBlock/SearchBlock';

type PropType = {
    onSearchItemTap: (item: recordItemType) => void,
    searchHits: Object,
};

// 区域对应的title文案
const TypeMapTitle = {
    apartments: '优质公寓',
    districts: '区域',
    subways: '地铁',
    circles: '商圈',
    blocks: '小区',
    addresses: '地址',
};

export default class SearchList extends PureComponent<PropType> {
    renderChildren() {
        const {
            searchHits = {},
            onSearchItemTap,
        } = this.props;

        const childrenArr = [];
        Object.keys(searchHits).forEach((type, index) => {
            const searchHitsArr = searchHits[type];
            searchHitsArr && searchHitsArr.length && childrenArr.push(
                <SearchBlock
                    key={index}
                    title={TypeMapTitle[type]}
                    type={type}
                    searchHitArr={searchHits[type]}
                    onSearchItemTap={onSearchItemTap}
                />,
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
