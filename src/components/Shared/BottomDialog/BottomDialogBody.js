import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const classPrefix = 'm-bottomdialog-body';

export default function BottomDialogBody(props) {
    const { children, className } = props;
    return (
        <div className={`${classPrefix} ${className}`}>
            {children}
        </div>
    )
}
