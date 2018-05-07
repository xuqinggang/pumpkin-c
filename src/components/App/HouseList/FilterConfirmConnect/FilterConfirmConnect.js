/* @flow */

import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-filterconfirm';

type PropType = {
    // 初始状态，用于清空时
    initialState: filterStateType,
    filterState: filterStateType,
    onUpdateActiveIndex: (number) => void,
    onFilterConfirm: (filterStateType) => void,
};

type StateType = {
    filterState: filterStateType,
};

// 高阶组件-添加清空和确定功能
export default function FilterConfirmConnectDecorators() {
    return function FilterConfirmConnectWrapper(WrappedCom: React$ComponentType<*>) {
        return class FilterConfirmConnect extends PureComponent<PropType, StateType> {
            state = {
                filterState: this.props.filterState || this.props.initialState,
            };

            handleWrapTap = (e: SyntheticEvent<>) => {
                e.stopPropagation();
                e.preventDefault();
            }

            onChange = (filterState: filterStateType) => {
                this.setState({
                    filterState,
                });
            }

            // 事件处理程序-确认回调
            handleConfirmTap = () => {
                this.props.onUpdateActiveIndex(-1);
                this.props.onFilterConfirm(this.state.filterState);
            }

            // 事件处理程序-清空点击
            handleClearTap = () => {
                // 清空时，利用组件的初始state来setState
                this.setState({
                    // eslint-disable-next-line
                    filterState: this.props.initialState,
                });
                // this.wrappedInstance._clearState();
            }

            componentWillReceiveProps(nextProps: PropType) {
                if ('filterState' in nextProps) {
                    this.setState({
                        filterState: nextProps.filterState,
                    });
                }
            }

            render() {
                const {
                    filterState,
                } = this.state;

                return (
                    <div className={`${classPrefix}`} onTouchTap={this.handleWrapTap}>
                        <WrappedCom
                            {...this.props}
                            filterState={filterState}
                            onChange={this.onChange}
                        />
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
                    </div>
                );
            }
        };
    };
}
