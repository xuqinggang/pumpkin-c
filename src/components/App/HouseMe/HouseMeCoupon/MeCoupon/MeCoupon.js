import React, { PureComponent } from 'react';
import { Tabs, Tab } from 'Shared/Tabs'
import MeUseCouponItem from '../MeCouponList/MeUseCouponItem';
import MeExpireCouponItem from '../MeCouponList/MeExpireCouponItem';

import './styles.less';

const classPrefix = 'm-mecoupon';

export default class MeCoupon extends PureComponent {
    render() {
        return (
            <div className={classPrefix}>
                <Tabs
                    className={`${classPrefix}-tabs`}
                    navClassName={`${classPrefix}-nav`}
                    contentClassName={`${classPrefix}-content`}
                >
                    <Tab label='待使用' navItemClass={`${classPrefix}-navitem`}>
                        123
                    </Tab>
                    <Tab label='已失效' navItemClass={`${classPrefix}-navitem`}>
                        345
                    </Tab>
                </Tabs>
                <MeUseCouponItem />
                <MeExpireCouponItem />
            </div>
        )
    }
}

