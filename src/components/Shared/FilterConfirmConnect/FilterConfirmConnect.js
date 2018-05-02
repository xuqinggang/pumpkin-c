import React, { Component } from 'react';

import './styles.less';

const classPrefix = 'm-filterconfirm';

export default function (hasConfirmButton = true) {
    return function filterWrap(WrappedCom) {
        return class FilterConfirmConnect extends Component {
            handleWrapTap = (e) => {
                e.stopPropagation();
                e.preventDefault();
            }

            handleConfirmTap = () => {
                this.refs.wrappedInstance._confirmState();
            }

            // 事件处理程序-清空点击
            handleClearTap = () => {
                this.refs.wrappedInstance._clearState();
            }

            render() {
                const {
                    filterState,
                    onDynamicSetLabel,
                } = this.props;

                return (
                    <div className={`${classPrefix}`} onTouchTap={this.handleWrapTap}>
                        <WrappedCom
                            ref='wrappedInstance'
                            filterState={filterState}
                            onFilterConfirm={this.props.onFilterConfirm}
                            onDynamicSetLabel={onDynamicSetLabel || (() => null)}
                        />
                        {
                            hasConfirmButton &&
                            <div className={`${classPrefix}-footer`}>
                                <span
                                    className="f-display-inlineblock f-align-center footer-clear"
                                    onTouchTap={this.handleClearTap}
                                >
                                    清空
                                </span>
                                <span
                                    className="f-display-inlineblock f-align-center footer-confirm"
                                    onTouchTap={this.handleConfirmTap}
                                >
                                    确定
                                </span>
                            </div>
                        }
                    </div>
                )
            }
        }
    }
}

// 
