import React, { Component } from 'react';
import classnames from 'classnames';
import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-headnavigate';

class HeadNavigate extends Component {
    static handleJump = () => {
        history.back();
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={classPrefix}>
                <span className={`f-display-inlineblock ${classPrefix}-title`}>周边及交通</span>
            </div>
        )
    }
}

export default HeadJumpConnect()(HeadNavigate);
