/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { shallowEqual } from 'lib/util';

import './styles.less';

type PropType = {
    index: number,
    onTouchTap: Function,
    isSelected: boolean,
    label: string,
    customRef: Function,
};

export default class TabsDropDownTab extends PureComponent<PropType> {
    static defaultProps = {
        onTouchTap: () => {},
        isSelected: false,
    };

    // 事件处理程序-每一个tab的点击
    handleTouchTap = (event: SyntheticEvent<>) => {
        const {
            onTouchTap,
            index,
        } = this.props;

        onTouchTap(event, index);
    }

    render() {
        const {
            label,
            isSelected,
            customRef,
        } = this.props;

        const itemClass = classnames('nav-item', {
            active: isSelected,
        });

        return (
            <li
                className={itemClass}
                onTouchTap={this.handleTouchTap}
                ref={customRef}
            >
                {label}
            </li>
        );
    }
}
