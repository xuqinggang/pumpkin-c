import React, { PureComponent } from 'react';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-editnicknameback';

class EditNickNameBack extends PureComponent {
    handleSaveTap = () => {
        if (this.props.onSaveNickName) {
            this.props.onSaveNickName();
        }
    }

    render() {
        return (
            [
                <span key={1} className="m-headJump-title">昵称</span>,
                <span
                    key={2}
                    onTouchTap={this.handleSaveTap}
                    className={`f-display-flex f-flex-align-center ${classPrefix}-btn-save`}
                >
                    保存
                </span>
            ]
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-between',
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(EditNickNameBack);
