import React, { Component } from 'react';
import './styles.less';

const classPrefix = 'm-bottomdialog-footer';

export default function BottomDialogFooter(props) {
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
