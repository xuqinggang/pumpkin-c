import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class HouseMeInfoBack extends PureComponent {
    render() {
        return (
            <span className="m-headJump-title">个人信息</span>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-start',
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(HouseMeInfoBack);
