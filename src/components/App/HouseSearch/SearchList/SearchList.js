/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import SearchItem from '../SearchItem/SearchItem';

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
    renderChildren() {
        const {
            searchData = {},
        } = this.props;

        const childrenArr = [];
        Object.keys(searchData).forEach((type, index) => {
            const searchDataArr = searchData[type];
            searchDataArr && searchDataArr.length && childrenArr.push(
                <SearchItem
                    key={index}
                    searchDataArr={searchData[type]}
                    title={TypeMapTitle[type]}
                    type={type}
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