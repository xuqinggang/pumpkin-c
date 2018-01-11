import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-loginback'

class LoginBack extends PureComponent{
    render() {
        return (
            <a href="" className={`f-display-flex f-flex-align-center ${classPrefix}-about`}>关于我们</a>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: `${classPrefix} f-flex-justify-between`,
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(LoginBack);
