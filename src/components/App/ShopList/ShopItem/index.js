import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { urlJoin } from 'lib/util';
import { goShopDetail } from 'application/App/routes/routes';

import './styles.less';

const classPrefix = 'm-shopitem';
const imgCutModifier = '?crop=1&cpos=middle&w=720&h=370';

class ShopItem extends PureComponent {

    goShopDetail = shopId => goShopDetail(this.props.history)(shopId);

    handleTouchTap = () => {
        this.goShopDetail(this.props.shop.id);
    }

    render() {
        const { shop } = this.props;

        const { headImage, houseCount, totalOnsaleCount, name, address, minPrice } = shop || {};

        return (
            <div className={`${classPrefix}`} onTouchTap={this.handleTouchTap}>
                <div className={`${classPrefix}-image`}>
                    <img src={`${headImage}${imgCutModifier}`} alt="" />
                    <div className={'tip'}>
                        <span>户型/{houseCount}个 </span>
                        <span>可租/{totalOnsaleCount}套</span>
                    </div>
                </div>
                <div className={`g-grid-row f-flex-justify-between ${classPrefix}-title-price`}>
                    <span className={`${classPrefix}-title f-singletext-ellipsis`}>{name}</span>
                    <span className={`${classPrefix}-price`}>{minPrice}
                        <span className={`${classPrefix}-unit`}>元/月起</span>
                    </span>
                </div>
                <div className={`f-display-flex ${classPrefix}-location`}>
                    <span className={`icon-region`} />
                    <span>{address}</span>
                </div>
            </div>
        );
    }
}

export default withRouter(ShopItem);
