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
                const { historyback } = jumpConditionObj;
                if (historyback) {
                    history.back();
                    return;
                }
            }

            render() {
                const { className } = jumpConditionObj;
                return (
                    <div className={ classnames(classPrefix, 'g-grid-row', className) }>
                        <span
                            onTouchTap={this.handleBackBtnTap}
                            className={`${classPrefix}-jumpbtn grid-col grid-col-reset f-flex-align-center icon-back`}
                        >
                        </span>
                        <div className={`${classPrefix}-other grid-col`}>
                            <WrappedCom />
                        </div>
                    </div>
                )
            }
        }
    }
}
