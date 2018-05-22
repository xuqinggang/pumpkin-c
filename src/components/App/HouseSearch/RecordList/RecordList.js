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
    static defaultProps = {
        track: {},
    };
    render() {
        const {
            list = [],
        } = this.props;

        return (
            <ul className={`${classPrefix}`}>
                {
                    list && list.map((item, index) => (
                        <RecordItem
                            className={`${classPrefix}-item`}
                            item={item}
                            key={index}
                            track={this.props.track}
                        />
                    ))
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
            onOtherSearchItemTap,
        } = this.props;

        // let {
        //     text,
        //     type, // `apartments,districts,subways,stations,circles,blocks,keywords(关键词搜索)`
        //     superField,
        //     superFieldValue,
        //     field,
        //     fieldValue,
        // } = item;
        let {
            type,
        } = item;

        switch (type) {
            case 'districts':
            case 'subways':
            case 'stations':
            case 'circles':
                onPositionSearchItemTap(item);
                break;
            default:
                onOtherSearchItemTap(item);
        }
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
                {...this.props.track}
            >
                {item.text}
            </li>
        );
    }
}
