/* @flow */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabTemplate from './TabTemplate.js'

import { shallowEqual } from 'lib/util';

import './styles.less';

type PropType = {
    index: number,
    className?: string,
    navItemClass?: string,
    onTouchTap: Function,
    isSelected: boolean,
    label: string,
    customRef: Function,
};

class Tab extends PureComponent<PropType> {
    static defaultProps = {
        onTouchTap: () => {},
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
            navItemClass,
            isSelected,
            customRef,
		} = this.props;

        const itemClass = classnames('nav-item', navItemClass, {
            active: isSelected,
        });

		return (
            <li className={itemClass}
                onTouchTap={this.handleTouchTap}
                ref={customRef}
            >
				{label}
			</li>
		);
	}
}

export default Tab;
