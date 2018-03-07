import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { urlJoin } from 'lib/util';

import './styles.less';

const classPrefix = 'm-apartmentitem';

class ApartmentItem extends PureComponent {
    handleTouchTap = () => {
        const urlPrefix = window.getStore('url').urlPrefix;
        this.props.history.push(urlJoin(urlPrefix, `apartment/detail/${this.props.apartment.id}`));
        // TODO 每次进入详情页，发送一次pv请求
        // window.send_stat_pv && window.send_stat_pv();
    }
    render() {
        const { apartment } = this.props;
        return (
            <div className={`${classPrefix}`} onTouchTap={this.handleTouchTap}>
                <div className={`${classPrefix}-image`}>
                    <img src={apartment.headImage} alt="" />
                    <div className={'tip'}>
                        <span>户型/{apartment.houseCount}个 </span>
                        <span>可租/{apartment.totalOnsaleCount}套</span>
                    </div>
                </div>
                <div className={`g-grid-row f-flex-justify-between ${classPrefix}-title-price`}>
                    <span className={`${classPrefix}-title`}>{apartment.name}</span>
                    <span className={`${classPrefix}-price`}>{apartment.minPrice}
                        <span className={`${classPrefix}-unit`}>元/月起</span>
                    </span>
                </div>
                <div className={`f-display-flex ${classPrefix}-location`}>
                    <span className={`icon-region`} />
                    <span>{apartment.address}</span>
                </div>
            </div>
        );
    }
}

export default withRouter(ApartmentItem);
