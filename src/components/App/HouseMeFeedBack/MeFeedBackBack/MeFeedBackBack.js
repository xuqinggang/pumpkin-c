import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class MeFeedBackBack extends PureComponent {
    render() {
        const {
            className,
        } = this.props;

        return (
            <h1 className="m-headJump-title">意见反馈</h1>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-start',
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(MeFeedBackBack);
