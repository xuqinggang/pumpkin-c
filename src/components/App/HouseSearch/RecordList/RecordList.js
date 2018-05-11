/* @flow */

import React, { PureComponent } from 'react';
// import classnames from 'classnames';

// import HouseSearchConnect from 'application/App/HouseSearch/HouseSearchConnect';

import './styles.less';

const classPrefix = 'm-recordlist';

type PropType = {
    onSearchItemTap: (item: recordItemType) => void,
    list: [recordItemType],
};

export default class RecordList extends PureComponent<PropType> {
    render() {
        const {
            list = [],
            onSearchItemTap,
        } = this.props;

        return (
            <ul className={`${classPrefix}`}>
                {
                    list && list.map((item, index) => (
                        <RecordItem
                            onSearchItemTap={onSearchItemTap}
                            className={`${classPrefix}-item`}
                            item={item}
                            key={index}
                        />
                    ))
                }
            </ul>
        );
    }
}

type ItemPropType = {
    className?: string,
    onSearchItemTap: (item: recordItemType) => void,
    item: recordItemType,
};

// @HouseSearchConnect()
class RecordItem extends PureComponent<ItemPropType> {
    handleSearchTap = () => {
        const {
            item,
            onSearchItemTap,
            // onPositionSearchItemTap,
            // onOtherSearchItemTap,
        } = this.props;
        onSearchItemTap(item);
        // let {
        //     text,
        //     type, // `apartments,districts,subways,stations,circles,blocks,keywords(关键词搜索)`
        //     superField,
        //     superFieldValue,
        //     field,
        //     fieldValue,
        // } = item;
        // let {
        //     type,
        // } = item;

        // switch (type) {
        //     case 'districts':
        //     case 'circles':
        //     case 'subways':
        //     case 'stations':
        //         onPositionSearchItemTap(item);
        //         break;
        //     default:
        //         onOtherSearchItemTap(item);
        // }
    }

    render() {
        const {
            className,
            item,
        } = this.props;

        return (
            <li
                className={className}
                onTouchTap={this.handleSearchTap}
            >
                {item.text}
            </li>
        );
    }
}
