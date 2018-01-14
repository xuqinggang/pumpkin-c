import React, { Component } from 'react';
import classnames from 'classnames';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-loginback'

class LoginBack extends Component {
    handleNavigateAboutTap = () => {
        const {
            cityName,
        } = this.props.match.params;
        this.props.history.push(`/${cityName}/nangua/about`);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <a 
                href="javascript:void(0)"
                className={`f-display-flex f-flex-align-center ${classPrefix}-about`}
                onTouchTap={this.handleNavigateAboutTap}
            >
                关于我们
            </a>
        );
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: `${classPrefix} f-flex-justify-between`,
    // backUrl: '//m.focus.cn',
    // // routerback: true,
})(LoginBack);
