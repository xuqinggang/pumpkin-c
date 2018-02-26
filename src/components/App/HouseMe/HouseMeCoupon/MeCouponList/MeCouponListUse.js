import React, { PureComponent } from 'react';
import MeCouponItemUse from './MeCouponItemUse';

import './styles.less';

const classPrefix = 'm-mecouponlist-use';

export default class MeCouponListUse extends PureComponent {
    render() {
        return (
            <div className={classPrefix}>
                <MeCouponItemUse />
            </div> 
        );
    }
}
