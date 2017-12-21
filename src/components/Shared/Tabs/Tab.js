import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabTemplate from './TabTemplate.js'

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
	constructor(props) {
		super(props);
	}

	handleTouchTap = (event) => {
		if(this.props.onTouchTab) {
			this.props.onTouchTab(this.props.index, event, this.props.passData);
		}
	}

	render() {
		const {
			label,
            navItemClass,
            width,
            isSelected,
		} = this.props;

        const itemClass = classnames('nav-item', navItemClass, {
            active: isSelected,
        });

		return (
            <li className={itemClass}
                onTouchTap={this.handleTouchTap}
                style={{width:width}}
            >
				{label}
			</li>
		);
	}
}

export default Tab;
