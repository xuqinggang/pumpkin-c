import React, { PureComponent } from 'react';

import { Tabs, Tab } from 'Shared/Tabs';
import MeCouponList from '../MeCouponList/MeCouponList';

import './styles.less';

const classPrefix = 'm-mecoupon';

export default class MeCoupon extends PureComponent {
    render() {
        return (
            <div className={classPrefix} style={{minHeight: (window.innerHeight / window.lib.flexible.rem - 1.1733) + 'rem'}}>
                <Tabs
                    isBar={true}
                    className={`${classPrefix}-tabs`}
                    navClassName={`${classPrefix}-nav`}
                    barClassName={`${classPrefix}-bar`}
                    contentClassName={`${classPrefix}-content`}
                >
                    <Tab label='待使用' navItemClass={`${classPrefix}-navitem`}>
                        <MeCouponList type="use" />
                    </Tab>
                    <Tab label='已失效' navItemClass={`${classPrefix}-navitem`}>
                        <MeCouponList type="expired" />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
