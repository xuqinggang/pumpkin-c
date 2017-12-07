import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const classPrefix = 'm-bottomdialog-closebtn';

export default class BottomDialogCloseBtn extends Component {
    static contextTypes = {
        closePotal: PropTypes.func,
    };

    handleCloseTouchTap = () => {
        this.context.closePotal();
    }

    render() {
        const { className } = this.props;
        return (
            <span className={`${classPrefix} ${className}`}>
                <i
                    className={`icon-big-close ${classPrefix}-closeicon`}
                    onTouchTap={this.handleCloseTouchTap}
                />
            </span>
        )
    }
}
