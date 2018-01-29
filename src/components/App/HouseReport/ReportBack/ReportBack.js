import React, { PureComponent } from 'react';

import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';

class ReportBack extends PureComponent {
    render() {
        return null;
    }
}

export default HeadJumpConnect({
    historyback: true,
    className: 'f-flex-justify-start',
})(ReportBack);
