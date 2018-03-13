import React, { PureComponent } from 'react';

import MeCouponItem from './MeCouponItem';
import SlideSide from 'Shared/SlideSide/SlideSide';

import './styles.less';

const classPrefix = 'm-mecouponitem-expired';

export default class MeExpireCouponItem extends PureComponent {
    handleDelTap = () => {
        const {
            onDelTap,
            index,
            couponItem,
        } = this.props;

        onDelTap(index, couponItem.couponUserId);
    }

    render() {
        return (
            <div className={classPrefix}>
                <SlideSide className={`${classPrefix}-wrapper`}>
                    <div className={`${classPrefix}-scroller g-grid-row`}>
                        <div className="content">
                            <div className="wrapper">
                                <MeCouponItem type='expired' couponItem={this.props.couponItem} />
                            </div> 
                        </div>
                        <div className="f-display-flex f-flex-align-center f-flex-justify-center del"
                            onTouchTap={this.handleDelTap}
                        >
                            删除
                        </div>
                    </div>
                </SlideSide>
            </div>
        );
    }
}
