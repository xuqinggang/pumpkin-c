import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { dateFormat } from 'lib/util';

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
            isExpand,
        } = this.state;

        const {
            type,
            couponItem = {},
        } = this.props;

        const {
            quota,
            name,
            ruleDesc,
            dateEnd,
            status,
        } = couponItem;

        const isExpired = type === 'expired';

        return (
            <div className={classPrefix}>
                <div className="g-grid-row f-flex-align-center f-flex-justify-between">
                    <span className={classnames(`${classPrefix}-title`, { expired: isExpired })}>
                        {name}
                    </span>
                    <span className={classnames(`${classPrefix}-price`, { expired: isExpired })}>¥{quota}</span>
                </div>
                <div className={`g-grid-row f-flex-align-center f-flex-justify-between ${classPrefix}-expiretime-wrapper`}>
                    <div className="f-display-inlineblock" onTouchTap={this.onRuleBtnTap}>
                        <span className={classnames(`${classPrefix}-btn-rules`, { expired: isExpired })}>使用规则</span>
                        <span className={classnames('icon-next', `${classPrefix}-icon-rules`, {
                            active: isExpand,
                        })} />
                    </div>
                    <span className={`${classPrefix}-expiretime`}>
                        {
                            type === 'use' ? dateFormat(parseInt(dateEnd * 1000, 10))
                            : status === 'USE' ? '已使用' : '已过期'
                        }
                    </span>
                </div>
                {
                    isExpand ?
                        (
                            <div className={`${classPrefix}-rules`} dangerouslySetInnerHTML={{__html: ruleDesc}}>
                            </div>
                        ) : null
                }
            </div>
        );
    }
}

