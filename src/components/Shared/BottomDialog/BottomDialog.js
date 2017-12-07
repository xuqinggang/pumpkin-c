import React, { Component, Children } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import BottomDialogHeader from './BottomDialogHeader';
import BottomDialogBody from './BottomDialogBody';
import BottomDialogCloseBtn from './BottomDialogCloseBtn';
import BottomDialogFooter from './BottomDialogFooter';
// import ModalBody from './ModalBody';
// import ModalFooter from './ModalFooter';

import './styles.less';

const maskClass = 'm-bottomdialog-mask';
const bottomDialogClass = 'm-bottomdialog';

export default class BottomDialog extends Component {
    static defaultProps = {
        modal: true,   
    };

    static childContextTypes = {
        closePotal: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            show: props.show || false,
        };
    }

    getChildContext() {
        return {
            closePotal: this.closePotal,
        };
    }

    closePotal = () => {
        this.setState({
            show: false,
        });
    }

    _removePortal() {
        document.body.removeChild(this.node);
    }

    // 事件处理程序-遮罩点击事件
    handleMaskTouchTap = (e) => {
        this.closePotal();
        // e.stopPropagation();
        // const { modal } = this.props;
        // // 非模态框
        // if (!modal) {
        //     if (e.currentTarget == e.target) {
        //         this.props.closePotal();
        //     }
        // }
        // return ;
    }

    handleDialogBodyTouchTap = (e) => {
        e.stopPropagation();
    }

    componentDidMount() {
        document.body.appendChild(this.node);
    }

    componentWillReceiveProps(nextProps) {
        if ('show' in nextProps) {
            this.setState({
                show: nextProps.show,
            });
        }
    }

    componentWillUnmount() {
        this._removePortal();
    }

    render() {
        const { className, children } = this.props;
        const { show } = this.state;

        if (!this.node) {
            this.node = document.createElement("div");
        }

        let newChildren = null;
        if (show) {
            newChildren = (
                <div className={`${maskClass}`} onTouchTap={this.handleMaskTouchTap}>
                    <div className={`${bottomDialogClass} ${className}`} onTouchTap={this.handleDialogBodyTouchTap}>
                        {
                            children
                        }
                    </div>
                </div>
            );
        }

        return createPortal(newChildren, this.node);
    }
}

BottomDialog.Footer = BottomDialogFooter;
BottomDialog.Header = BottomDialogHeader;
BottomDialog.Body = BottomDialogBody;
BottomDialog.CloseBtn = BottomDialogCloseBtn;
