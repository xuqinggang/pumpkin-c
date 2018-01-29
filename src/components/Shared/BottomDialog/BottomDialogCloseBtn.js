import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const classPrefix = 'm-bottomdialog-closebtn';

export default class BottomDialogCloseBtn extends Component {
    static contextTypes = {
        _closePotal: PropTypes.func,
    };

    handleCloseTouchTap = (e) => {
        this.context._closePotal();
    }

    render() {
        const { className } = this.props;
        return (
            <span
                className={`${classPrefix} ${className}`}
                onTouchTap={this.handleCloseTouchTap}
            >
                <i
                    className={`icon-big-close ${classPrefix}-closeicon`}
                />
            </span>
        )
    }
}
