import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.less';

const TabTemplate = ({children, isSelected, contentItemClass}) => {
	const templateStyle = {};
	if(!isSelected) {
		templateStyle.width = 0;
		templateStyle.height = 0;
		templateStyle.overflow = 'hidden';
	}

	const contentClassName = classnames('content-item', contentItemClass, {
		'active': isSelected,
	});

	return (
		<div style={templateStyle} className={contentClassName}>
			{children}
		</div>
	)
}

TabTemplate.propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
};

export default TabTemplate;
