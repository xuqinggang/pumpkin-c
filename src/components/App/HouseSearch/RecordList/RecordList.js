/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HouseSearchConnect from 'application/App/HouseSearch/HouseSearchConnect';

import './styles.less';

const classPrefix = 'm-recordlist';

type PropType = {
    list: Array<{
        text: string,
    }>,
}

export default class RecordList extends PureComponent<PropType> {
    render() {
        const {
            list = [],
        } = this.props;

        return (
            <ul className={`${classPrefix}`}>
                {
                    list && list.map((item, index) => {
                        return (
                            <RecordItem
                                className={`${classPrefix}-item`}
                                item={item}
                                key={index}
                            />
                        );
                    })
                }
            </ul>
        );
    }
}

type ItemPropType = {
    className: string,
    onPositionSearchItemTap: Function,
    item: {
        text: string,
    },
};

@HouseSearchConnect()
class RecordItem extends PureComponent<ItemPropType> {
    handleSearchTap = () => {
        const {
            item,
            onPositionSearchItemTap,
        } = this.props;

        // let {
        //     text,
        //     type,
        //     superField,
        //     superFieldValue,
        //     field,
        //     fieldValue,
        // } = item;
        onPositionSearchItemTap(item);
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
