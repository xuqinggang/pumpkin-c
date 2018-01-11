import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

export default class CountDownBtn extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 开始倒计时
            start: props.start || false,
            // 倒计时60s
            downTime: props.downTime || 60,
        };
    }

    handleResetTap = () => {
        const { start } = this.state;
        if (!start) {
            this.setState({
                start: true,
                downTime: this.props.downTime,
            });
        }
    }

    render() {
        let { start, downTime } = this.state;

        if (start) {
            this.timer = setInterval(() => {
                // 归0停止倒计时
                if (downTime < 0) {
                    clearInterval(this.timer);
                    this.setState({
                        start: false,
                    });
                }

                this.setState({
                    downTime: --downTime,
                });
            }, 1000);
        }

        const btnClass = classnames('f-display-inlineblock', 'm-countdownbtn', {
            disable: start,
        });

        return (
            <span className={btnClass} onTouchTap={this.handleResetTap}>
                {
                    start ? `${downTime}s`
                    : '重新获取'
                }
            </span>
        );
    }
}
