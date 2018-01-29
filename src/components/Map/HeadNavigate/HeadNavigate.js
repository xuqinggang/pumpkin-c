import React, { PureComponent } from 'react';
import classnames from 'classnames';
import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

import './styles.less';

const classPrefix = 'm-headnavigate';

class HeadNavigate extends PureComponent {
    render() {
        return (
            <span className={`f-display-flex f-flex-align-center ${classPrefix}-title`}>周边及交通</span>
        )
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: `f-flex-justify-start`,
})(HeadNavigate);
