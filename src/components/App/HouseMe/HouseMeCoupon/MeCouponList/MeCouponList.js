import React, { PureComponent } from 'react';
import classnames from 'classnames';

import MeCouponItemExpire from './MeCouponItemExpire';
import MeCouponItemUse from './MeCouponItemUse';

import './styles.less';

const expiredPrefix = 'm-mecouponlist-expired';
const usePrefix = 'm-mecouponlist-use';

export default class MeCouponList extends PureComponent {
    render() {
        const {
            couponList,
            type,
            onDelTap
        } = this.props;

        let TmpMeCouponItemClass = MeCouponItemUse;
        if (type === 'expired') {
            TmpMeCouponItemClass = MeCouponItemExpire;
        }

        return (
            <div className={classnames({
                [usePrefix]: type === 'use',
                [expiredPrefix]: type === 'expired',
            })}>
            {
                couponList.map((couponItem, index) => 
                    <TmpMeCouponItemClass onDelTap={onDelTap} index={index} key={couponItem} couponItem={couponItem}/>
                )
            }
            </div> 
        );
    }
}
