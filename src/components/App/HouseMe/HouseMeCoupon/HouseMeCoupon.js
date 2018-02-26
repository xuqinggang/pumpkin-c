import React, { PureComponent } from 'react';

import MeCouponBack from './MeCouponBack/MeCouponBack';
import MeCoupon from './MeCoupon/MeCoupon';

export default class HouseMeCoupon extends PureComponent {
    render() {
        return (
            <div>
                <MeCouponBack />
                <MeCoupon />
            </div>
        );
    }
}
