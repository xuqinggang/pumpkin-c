import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.less';

class TabTemplate extends Component {
    render() {
        const {children, isSelected, contentItemClass} = this.props;
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
        );
    }
        
}

TabTemplate.propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
};

export default TabTemplate;
