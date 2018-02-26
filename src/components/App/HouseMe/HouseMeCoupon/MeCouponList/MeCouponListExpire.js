import React, { PureComponent } from 'react';
import MeCouponItemExpire from './MeCouponItemExpire';

import './styles.less';

const classPrefix = 'm-mecouponlist-expired';

export default class MeCouponListExpire extends PureComponent {
    render() {
        const {
            couponList,
        } = this.props;

        return (
            <div className={classPrefix}>
                <MeCouponItemExpire />
            </div> 
        );
    }
}
