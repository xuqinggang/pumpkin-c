import React, { Component } from 'react';
import './styles.less';

const classPrefix = 'm-bottomdialog-header';

export default function BottomDialogHeader(props) {
    const { children, className } = props;

    if (children) {
        return (
            <div className={`${classPrefix} ${className}`}>
                {
                    children
                }
            </div>
        )
    }

    return null;
}
