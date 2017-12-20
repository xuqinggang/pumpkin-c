import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-filterconfirm';

export default function() {
    return function(WrappedCom) {
        return class FilterConfirmConnect extends Component {
            constructor(props) {
                super(props);
            }

            handleWrapTap = (e) => {
                e.stopPropagation();
            }

            handleConfirmTap = () => {

            }

            handleClearTap = () => {

            }

            render() {
                const {
                    ...extraProps,
                } = this.props;
                return (
                    <div className={`${classPrefix}`} onTouchTap={this.handleWrapTap}>
                        <WrappedCom {...extraProps} />
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
