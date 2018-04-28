/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

type PropType = {
    isSelected: boolean,
    children: React$Node,
};

class TabsDropDownTemplate extends PureComponent<PropType> {
    render() {
        const {
            children,
            isSelected,
        } = this.props;
        // if(!isSelected) {
        //     templateStyle.width = 0;
        //     templateStyle.height = 0;
        //     templateStyle.overflow = 'hidden';
        // }

        const contentClassName = classnames('content-item', {
            active: isSelected,
        });

        return (
            isSelected ?
                <div className={contentClassName}>
                    {children}
                </div>
                : null
        );
    }
}

export default TabsDropDownTemplate;
