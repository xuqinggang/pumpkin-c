import React, { PureComponent } from 'react';

import MeCouponBack from './MeCouponBack/MeCouponBack';
import MeCoupon from './MeCoupon/MeCoupon';
import QRCode from 'qrcode';

import './styles.less';

const classPrefix = 'm-housemeindex';

export default class HouseMeCoupon extends PureComponent {
    componentDidMount() {
        QRCode.toCanvas(this.canvasDom, 'sample text', function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }
    render() {
        return (
            <div>
                <MeCouponBack />
                <MeCoupon />
                <canvas ref={(dom) => { this.canvasDom = dom; } }></canvas>
            </div>
        );
    }
}
