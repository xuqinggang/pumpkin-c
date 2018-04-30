/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group'

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
            <CSSTransition
                key={index}
                classNames="example"
                timeout={{enter: 1000, exit: 1000}}
            >
                <div className={contentClassName}>
                    {children}
                </div>
            </CSSTransition>
            : null
        );
    }
}

export default TabsDropDownTemplate;
