import React, { PureComponent } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class MeBack extends PureComponent {
    // 回调函数-回退按钮点击
    // onBackTap = () => {
    //     // 我的页面，回退按钮回到首页

    //     const {
    //         url: matchUrl,
    //     } = this.props.match;

    //     // url路径去掉me字段 (/bj/nangua/me => /bj/nangua)
    //     // 根url前缀 /bj/nangua
    //     const rootUrlPrefix = matchUrl.substr(0, matchUrl.indexOf('/me'));
    //     this.props.history.push(`${rootUrlPrefix}`);
    // }

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
