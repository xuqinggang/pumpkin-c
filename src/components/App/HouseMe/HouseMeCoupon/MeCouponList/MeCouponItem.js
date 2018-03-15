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
            isExpand,
        } = this.state;

        const {
            type,
            couponItem = {},
        } = this.props;

        const {
            title,
            ruleDesc,
            price,
            expiredTime,
        } = couponItem;

        const isExpired = type === 'expired';

        return (
            <div className={classPrefix}>
                <ul className="g-grid-row f-flex-align-center f-flex-justify-between">
                    <li className={classnames(`${classPrefix}-title`, { expired: isExpired })}>
                        {title}
                    </li>
                    <li className={classnames(`${classPrefix}-price`, { expired: isExpired })}>{price}</li>
                </ul>
                <ul className={`g-grid-row f-flex-align-center f-flex-justify-between ${classPrefix}-expiretime-wrapper`}>
                    <li className="f-display-inlineblock" onTouchTap={this.onRuleBtnTap}>
                        <span className={classnames(`${classPrefix}-btn-rules`, { expired: isExpired })}>使用规则</span>
                        <span className={classnames('icon-next', `${classPrefix}-icon-rules`, {
                            active: isExpand,
                        })} />
                    </li>
                    <li className={`${classPrefix}-expiretime`}>
                        {expiredTime}
                    </li>
                </ul>
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

