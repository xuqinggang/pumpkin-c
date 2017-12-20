import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-filterconfirm';

export default function() {
    return function(WrappedCom) {
        return class FilterConfirmConnect extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    // 是否清空
                    isClear: false,
                };
                this.filterData = null;
            }

            onFilterChange = (data) => {
                this.filterData = data;
            }

            handleWrapTap = (e) => {
                e.stopPropagation();
                e.preventDefault();
            }

            handleConfirmTap = () => {
                this.props.onFilterConfirm(this.filterData);
            }

            // 事件处理程序-清空点击
            handleClearTap = () => {
                this.filterData = null;
                this.setState({
                    isClear: true,
                });
            }

            componentWillReceiveProps() {
                console.log('componentWillReceiveProps')
                this.setState({
                    isClear: false,
                });
            }

            render() {
                const {
                    ...extraProps,
                } = this.props;

                const {
                    isClear,
                } = this.state;

                return (
                    <div className={`${classPrefix}`} onTouchTap={this.handleWrapTap}>
                        <WrappedCom
                            isClear={isClear}
                            onFilterChange={this.onFilterChange}
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
                )
            }
        }
    }
}
