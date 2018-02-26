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
            couponItem = {},
        } = this.props;

        const {
            quota,
            name,
            ruleDesc,
            dateEnd,
            statusCode,
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
                        <span></span>
                    </div>
                    <span className={`${classPrefix}-expiretime`}>
                        {dateEnd}
                    </span>
                </div>
                {
                    this.state.isExpand ?
                        (
                            <div className={`${classPrefix}-rules`} dangerouslySetInnerHTML={{__html: ruleDesc}}>
                            </div>
                        ) : null
                }
            </div>
        );
    }
}

