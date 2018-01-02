import React, { PureComponent } from 'react';
import classnames from 'classnames';
import HeadJumpConnect from 'Shared/HeadJumpConnect/HeadJumpConnect';
import './styles.less';

const classPrefix = 'm-headshared';

class HeadShared extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return null;
        // return (
        //     <div className={classPrefix}>
        //         <span className={`${classPrefix}-like`}>like</span>
        //         <span className={`${classPrefix}-like`}>help</span>
        //         <span className={`${classPrefix}-like`}>shared</span>
        //     </div>
        // )
    }
}

export default HeadJumpConnect({historyback: true})(HeadShared);
