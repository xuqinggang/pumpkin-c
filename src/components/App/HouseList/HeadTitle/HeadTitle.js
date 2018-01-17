import React, { Component } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import logo from 'images/App/logo.png';
import './styles.less';

const classPrefix = 'm-headtitle';

function HeadTitle() {
    return (
        <img src={logo} className={`f-display-inlineblock ${classPrefix}-log`} />
    );
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-position-relative',
    backUrl: '//m.focus.cn',
    // routerback: true,
})(HeadTitle);
