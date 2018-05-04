/* @flow */

import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';

import './styles.less';

type PropType = {
    isSelected: boolean,
    children: React$Node,
};

class TabsDropDownTemplate extends PureComponent<PropType> {
    render() {
        const {
            index,
            children,
            isSelected,
            onUpdateActiveIndex,
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
            <div className={contentClassName}>
                {
                    cloneElement(Children.only(children), {
                        onUpdateActiveIndex,
                    })
                }
            </div>
        );
    }
}

export default TabsDropDownTemplate;
