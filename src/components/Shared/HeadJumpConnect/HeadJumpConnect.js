import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-headJump';

export default function(jumpConditionObj = {}) {
    return function(WrappedCom) {
        return class HeadJumpConnect extends Component {
            constructor(props) {
                super(props);
            }

            handleBackBtnTap = () => {
                const { historyback, backUrl } = jumpConditionObj;
                if (backUrl) {
                    window.location.href = backUrl;
                    return;
                }

                if (historyback) {
                    history.back();
                    return;
                }
            }

            componentDidMount() {
                if (window.isApp) {
                    this.header.style.display = 'none';
                }
            }

            render() {
                const { className } = jumpConditionObj;
                return (
                    <div ref={(dom) => { this.header = dom; }} className={ classnames(classPrefix, 'g-grid-row') }>
                        <span
                            onTouchTap={this.handleBackBtnTap}
                            className={`${classPrefix}-jumpbtn grid-col grid-col-reset f-flex-align-center icon-back`}
                        >
                        </span>
                        <div className={`${classPrefix}-other grid-col f-flex-align-center`}>
                            <WrappedCom />
                        </div>
                    </div>
                )
            }
        }
    }
}