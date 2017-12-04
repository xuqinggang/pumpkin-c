import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.less';

const TabTemplate = ({children, selected}) => {
	const templateStyle = {};
	if(!selected) {
		templateStyle.width = 0;
		templateStyle.height = 0;
		templateStyle.overflow = 'hidden';
	}

	const contentClassName = classnames('content-item', {
		'content-item-active': selected,
	});

	return (
		<div style={templateStyle} className={contentClassName}>
			{children}
		</div>
	)
}

TabTemplate.PropTypes = {
	children: PropTypes.node,
	selected: PropTypes.bool,
};

export default TabTemplate;
