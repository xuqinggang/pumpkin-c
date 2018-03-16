import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
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
        mask: true,
        show: false,
    };

    static childContextTypes = {
        _closePotal: PropTypes.func,
    };

    getChildContext() {
        return {
            _closePotal: this._closePotal,
        };
    }

    _closePotal = (e) => {
        const { onClose } = this.props;
        if (onClose) {
            onClose(e);
        }
    }

    _removePortal() {
        document.body.removeChild(this.node);
    }

    // 事件处理程序-遮罩点击事件
    handleMaskTouchTap = (e) => {
        console.log('e', 'handleMaskTouchTap');
        this._closePotal();

        // e.preventDefault();
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

    componentWillUnmount() {
        this._removePortal();
    }

    render() {
        if (window.isServerRender) { return null; }

        const { className, children, onClose, mask, show } = this.props;

        if (!this.node) {
            this.node = document.createElement("div");
        }

        let newChildren = null;

        if (show) {
            newChildren = (
                <div className={mask ? `${maskClass}` : ''} onTouchTap={mask ? this.handleMaskTouchTap : undefined}>
                    <div className={`${bottomDialogClass} ${className}`} onTouchTap={this.handleDialogBodyTouchTap}>
                        {
                            children
                        }
                    </div>
                </div>
            );
        }

        return ReactDOM.createPortal(newChildren, this.node);
    }
}

BottomDialog.Footer = BottomDialogFooter;
BottomDialog.Header = BottomDialogHeader;
BottomDialog.Body = BottomDialogBody;
BottomDialog.CloseBtn = BottomDialogCloseBtn;
