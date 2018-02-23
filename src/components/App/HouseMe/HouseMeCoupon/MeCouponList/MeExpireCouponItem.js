import React, { PureComponent } from 'react';

import MeCouponItem from './MeCouponItem';

import './styles.less';

const classPrefix = 'm-mecouponitem-expired';

export default class MeExpireCouponItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classPrefix}>
                <MeCouponItem type='expired' />
            </div>
        );
    }
}

