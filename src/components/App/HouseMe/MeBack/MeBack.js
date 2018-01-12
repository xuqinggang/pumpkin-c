import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-meback'

class MeBack extends PureComponent {
    render() {
        const {
            className,
        } = this.props;

        return (
            <span className={classnames(`${classPrefix}-title`, className)}>我的</span>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: `${classPrefix} f-flex-justify-start`,
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(MeBack);
