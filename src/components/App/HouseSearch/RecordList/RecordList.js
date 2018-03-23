/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-recordlist';

type PropType = {
    list: Array<{
        text: string,
    }>,
}

export default class RecordList extends PureComponent<PropType> {
    handleSeachTap = () => {

    }

    render() {
        const {
            list = [],
        } = this.props;

        return (
            <ul className={`${classPrefix}`}>
                {
                    list && list.map((item, index) => {
                        return (
                            <RecordItem item={item} className={`${classPrefix}-item`} key={index}/>
                        );
                    })
                }
            </ul>
        );
    }
}

type ItemPropType = {
    className: string,
    onChangeTap: Function,
    item: {
        text: string,
    },
};

class RecordItem extends PureComponent<ItemPropType> {
    static defaultProps = {
        onChangeTap: () => {},
    };

    handleSearchTap = () => {
        const {
            item = {},
            onChangeTap,
        } = this.props;

        const {
            text,
            field,
            fieldValue,
        } = item;

        onChangeTap({
            text: item.text,
            params: {
                [field]: fieldValue,
            },
        });
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
