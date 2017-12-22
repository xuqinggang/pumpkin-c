import React, { Component } from 'react';
import classnames from 'classnames';
import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-headshared';

function HeadTitle() {
    return (
        <span className={`${classPrefix}-like`}>like</span>
    );
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-position-static',
    // routerback: true,
})(HeadTitle);
