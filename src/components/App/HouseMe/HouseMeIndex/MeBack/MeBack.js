import React, { PureComponent } from 'react';

import { goHouseList } from 'application/App/routes/routes';
import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class MeBack extends PureComponent {
    // 回调函数-回退按钮点击
    onBackTap = () => {
        // 我的页面，回退按钮回到首页
        const { filterUrlFragment } = window.getStore('url') || {};
        goHouseList(this.props.history)(filterUrlFragment);
    }

    render() {
        return (
            <h1 className="m-headJump-title">我的</h1>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-start',
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(MeBack);
