import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { urlJoin } from 'lib/util';

import './styles.less';

const classPrefix = 'm-apartmentitem';

class ApartmentItem extends PureComponent {
    handleTouchTap = () => {
        const urlPrefix = window.getStore('url').urlPrefix;
        this.props.history.push(urlJoin(urlPrefix, `apartment/detail/${this.props.apartment.shopId}`));
        // TODO 每次进入详情页，发送一次pv请求
        // window.send_stat_pv && window.send_stat_pv();
    }
    render() {
        const { apartment } = this.props;
        return (
            <div className={`${classPrefix}`} onTouchTap={this.handleTouchTap}            >
                <div className={`${classPrefix}-image`}>
                    <img src={apartment.image} alt="优质公寓" />
                    <div className={'tip'}>
                        <span>户型/{apartment.floorPlanCount}个</span>
                        <span>可租/{apartment.rentCount}套</span>
                    </div>
                </div>
                <div className={`g-grid-row f-flex-justify-between ${classPrefix}-title-price`}>
                    <span className={`${classPrefix}-title`}>{apartment.title}</span>
                    <span className={`${classPrefix}-price`}>{apartment.price}
                        <span className={`${classPrefix}-unit`}>元/月</span>
                    </span>
                </div>
                <div className={`f-display-flex ${classPrefix}-location`}>
                    <span className={`icon-region`} />
                    <span>{apartment.location}</span>
                </div>
            </div>
        );
    }
}

export default withRouter(ApartmentItem);
