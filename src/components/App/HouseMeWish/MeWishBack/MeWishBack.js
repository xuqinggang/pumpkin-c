import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class MeWishBack extends PureComponent {
    render() {
        const {
            className,
        } = this.props;

        return (
            <span className="m-headJump-title">心愿单</span>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-start',
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(MeWishBack);
