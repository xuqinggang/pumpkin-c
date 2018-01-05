import React, { Component } from 'react';
import classnames from 'classnames';

import MoreFilterTagData from 'components/App/HouseList/MoreFilter/MoreFilterTagData';
import HouseTypeFilterTagData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';
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

                this.filterState = props.filterState;
            }

            onFilterChange = (filterState) => {
                this.filterState = filterState;
            }

            handleWrapTap = (e) => {
                e.stopPropagation();
                e.preventDefault();
            }

            handleConfirmTap = () => {
                this.props.onFilterConfirm(this.filterState);
            }

            // 事件处理程序-清空点击
            handleClearTap = () => {
                this.filterState = null;

                this.setState({
                    isClear: true,
                });
            }

            componentWillReceiveProps() {
                this.setState({
                    isClear: false,
                });
            }

            render() {
                const {
                    filterState,
                } = this.props;

                const {
                    isClear,
                } = this.state;

                return (
                    <div className={`${classPrefix}`} onTouchTap={this.handleWrapTap}>
                        <WrappedCom
                            isClear={isClear}
                            filterState={filterState}
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

// 
