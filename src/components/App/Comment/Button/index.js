import React from 'react';
import './styles.less';

const classPrefix = 'comment-button';

export default function Button({
    onTouchTap = () => null,
    children,
    className = '',
}) {
    return (
        <div
            className={`${classPrefix} ${className}`}
            onTouchTap={onTouchTap}
        >
            {children}
        </div>
    );
}
