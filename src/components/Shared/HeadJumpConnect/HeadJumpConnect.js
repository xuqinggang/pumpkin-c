import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-headJump';

export default function HeadJumpConnectWrap(jumpConditionObj = {}) {
    return function HeadJumpConnectInner(WrappedCom) {
        return class HeadJumpConnect extends Component {
            handleBackBtnTap = () => {
                if (this.refs.wrappedCom.onBackTap) {
                    this.refs.wrappedCom.onBackTap();
                    return ;
                }
                const { historyback, backUrl } = jumpConditionObj;
                if (backUrl) {
                    window.location.href = backUrl;
                    return;
                }

                if (historyback) {
                    history.back();
                }
            }

            render() {
                const { className } = jumpConditionObj;
                return (
                    <div className={classnames(classPrefix, 'g-grid-row', className)}>
                        <span
                            onTouchTap={this.handleBackBtnTap}
                            className={`${classPrefix}-jumpbtn f-display-flex f-flex-align-center icon-back`}
                        />
                        <WrappedCom {...this.props} ref="wrappedCom" />
                        {
                            // <div className={`${classPrefix}-other grid-col f-flex-align-center`}>
                            //     <WrappedCom />
                            //     </div>
                        }
                    </div>
                );
            }
        };
    };
}
