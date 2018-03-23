import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { urlJoin } from 'lib/util';
import { withHistory } from 'application/App/routes';

import './styles.less';

const classPrefix = 'm-shopitem';
const imgCutModifier = '?crop=1&cpos=middle&w=720&h=370';

const createShopDetailPath = apartmentId => `shop/detail/${apartmentId}`;

class ShopItem extends PureComponent {

    goShopDetail = (apartmentId) => withHistory(this.props.history)(createShopDetailPath)(apartmentId);
    
    handleTouchTap = () => {
        this.goShopDetail(this.props.apartment.id);
    }

    render() {
        const { apartment } = this.props;
        return (
            <div className={`${classPrefix}`} onTouchTap={this.handleTouchTap}>
                <div className={`${classPrefix}-image`}>
                    <img src={`${apartment.headImage}${imgCutModifier}`} alt="" />
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

export default withRouter(ShopItem);
