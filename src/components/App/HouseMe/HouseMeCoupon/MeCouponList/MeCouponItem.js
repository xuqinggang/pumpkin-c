import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-mecouponitem';

export default class MeCouponItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
        };
    }
    onRuleBtnTap = () => {
        this.setState({
            isExpand: !this.state.isExpand,
        });
    }
    render() {
        const {
            type,
        } = this.props;

        const isExpired = type === 'expired';

        return (
            <div className={classPrefix}>
                <div className="g-grid-row f-flex-align-center f-flex-justify-between">
                    <span className={classnames(`${classPrefix}-title`, { expired: isExpired })}>
                        xxxxx活动租房券
                    </span>
                    <span className={classnames(`${classPrefix}-price`, { expired: isExpired })}>¥1000</span>
                </div>
                <div className={`g-grid-row f-flex-align-center f-flex-justify-between ${classPrefix}-expiretime-wrapper`}>
                    <div className="f-display-inlineblock" onTouchTap={this.onRuleBtnTap}>
                        <span className={classnames(`${classPrefix}-btn-rules`, { expired: isExpired })}>使用规则</span>
                        <span></span>
                    </div>
                    <span className={`${classPrefix}-expiretime`}>
                        有效期至2018-03-07
                    </span>
                </div>
                {
                    this.state.isExpand ?
                        (
                            <div className={`${classPrefix}-rules`}>
                                1.不可与其他优惠券共享<br/>
                                2.一家公寓同时只使用一张租房券<br/>
                                3.对方；哈古湖泊为第九期撒娇发哈上班<br/>
                            </div>
                        ) : null
                }
            </div>
        );
    }
}

