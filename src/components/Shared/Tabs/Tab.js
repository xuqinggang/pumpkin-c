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
		selected: PropTypes.bool,
		width: PropTypes.string,
		label: PropTypes.node,
		tab: PropTypes.node,
	}
	constructor(props) {
		super(props);
	}

	handleTouchTap = (event) => {
		if(this.props.onTouchTab) {
			this.props.onTouchTab(this.props.index, event, this)
		}
	}

	render() {
		const {
			label,
			width,
		} = this.props;
		return(
			<li className="nav-item" onTouchTap={this.handleTouchTap} style={{width:width}}>
				{label}
			</li>
		)
	}
}

export default Tab;
