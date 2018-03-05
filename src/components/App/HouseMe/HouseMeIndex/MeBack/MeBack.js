import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';
import { urlJoin } from 'lib/util';

class MeBack extends PureComponent {
    // 回调函数-回退按钮点击
    onBackTap = () => {
        // 我的页面，回退按钮回到首页
        const { urlPrefix, filterUrlFragment = '', urlQuery } = window.getStore('url');
        this.props.history.push(urlJoin(urlPrefix, 'list', filterUrlFragment) + `?${urlQuery}`);
    }

    render() {
        const {
            className,
        } = this.props;
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
