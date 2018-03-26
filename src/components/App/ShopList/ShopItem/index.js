import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { urlJoin } from 'lib/util';
import { withHistory } from 'application/App/routes';

import './styles.less';

const classPrefix = 'm-shopitem';
const imgCutModifier = '?crop=1&cpos=middle&w=720&h=370';

const createShopDetailPath = shopId => `shop/detail/${shopId}`;

class ShopItem extends PureComponent {

    goShopDetail = (shopId) => withHistory(this.props.history)(createShopDetailPath)(shopId);
    
    handleTouchTap = () => {
        this.goShopDetail(this.props.shop.id);
    }

    render() {
        const { shop } = this.props;
        return (
            <div className={`${classPrefix}`} onTouchTap={this.handleTouchTap}>
                <div className={`${classPrefix}-image`}>
                    <img src={`${shop.headImage}${imgCutModifier}`} alt="" />
                    <div className={'tip'}>
                        <span>户型/{shop.houseCount}个 </span>
                        <span>可租/{shop.totalOnsaleCount}套</span>
                    </div>
                </div>
                <div className={`g-grid-row f-flex-justify-between ${classPrefix}-title-price`}>
                    <span className={`${classPrefix}-title`}>{shop.name}</span>
                    <span className={`${classPrefix}-price`}>{shop.minPrice}
                        <span className={`${classPrefix}-unit`}>元/月起</span>
                    </span>
                </div>
                <div className={`f-display-flex ${classPrefix}-location`}>
                    <span className={`icon-region`} />
                    <span>{shop.address}</span>
                </div>
            </div>
        );
    }
}

export default withRouter(ShopItem);
