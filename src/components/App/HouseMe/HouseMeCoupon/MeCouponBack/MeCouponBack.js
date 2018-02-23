import React, { PureComponent } from 'react';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class MeCouponBack extends PureComponent {
    render() {
        return (
            <h1 className="m-headJump-title">意见反馈</h1>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-start',
})(MeCouponBack);
