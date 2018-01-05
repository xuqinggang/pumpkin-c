import React, {
    Component,
    PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabTemplate from './TabTemplate.js'

import { shallowEqual } from 'lib/util';

import './styles.less';

class Tab extends Component {
	static propTypes = {
		index: PropTypes.number,
		className: PropTypes.string,
		onTouchTab: PropTypes.func,
		isSelected: PropTypes.bool,
		width: PropTypes.string,
		label: PropTypes.node,
		tab: PropTypes.node,
    }

    // 事件处理程序-每一个tab的点击
    handleTouchTap = (event) => {
        const {
            onTouchTab,
            index,
            itemData,
        } = this.props;

        if(onTouchTab) {
            onTouchTab(event, index, itemData);
        }
	}

    shouldComponentUpdate(nextProps, nextState) {
        const {
            children: nextChildren,
            ...nextExtraProps,
        } = nextProps;

        const {
            children,
            ...extraProps,
        } = this.props;

        return !shallowEqual(nextExtraProps, extraProps);
    }

    render() {
		const {
			label,
            navItemClass,
            isSelected,
		} = this.props;

        const itemClass = classnames('nav-item', navItemClass, {
            active: isSelected,
        });

		return (
            <li className={itemClass}
                onTouchTap={this.handleTouchTap}
            >
				{label}
			</li>
		);
	}
}

export default Tab;
