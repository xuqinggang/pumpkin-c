import React, { PureComponent } from 'react';

import MeCouponBack from './MeCouponBack/MeCouponBack';
import MeCoupon from './MeCoupon/MeCoupon';

import { isApp, isRmHead } from 'lib/const';

export default class HouseMeCoupon extends PureComponent {
    render() {
        return (
            <div>
                {
                    isApp() && isRmHead() ?
                        null :
                        <MeCouponBack />
                }
                <MeCoupon />
            </div>
        );
    }
}
