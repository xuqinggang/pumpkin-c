import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { getScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

import './styles.less';

const classPrefix = 'm-backtop';

export default class BackTop extends PureComponent {
    handleBackTopTap = () => {
        const srcScrollTop = getScrollTop();
        animateScrollTop(srcScrollTop, 0, 100);
    }

    render() {
        const {
            className,
        } = this.props;
        return (
            <span className={classnames(classPrefix, className)} onTouchTap={this.handleBackTopTap}>
                <span className={`${classPrefix}-icon-wrap`}>
                    <span className={`${classPrefix}-line`} />
                    <span className={`icon-next ${classPrefix}-icon`}/>
                </span>
            </span>
        );
    }
}
