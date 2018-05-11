import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';
import ShopItem from 'components/App/ShopList/ShopItem';
import TitleWithMore from '../TitleWithMore';

import './styles.less';

const classPrefix = 'm-apartmentshop';

export default class ApartmentShop extends PureComponent {

    renderShop = (shop, index) => {
        return (
            <li className="f-display-inlineblock list-item" key={index}>
                <ShopItem shop={shop} />
            </li>
        );
    }

    render() {
        const {
            shops,
            goMore,
        } = this.props;

        if (shops.length <= 0) return null;

        return (
            <div className={classnames(classPrefix)}>
                <div className="more-title-wrap">
                    <TitleWithMore title="精品门店" goMore={goMore} />
                </div>
                <SimpleScroll key={shops.length} className={`${classPrefix}-wrapper`}>
                    <ul className={`${classPrefix}-list`}>
                        {
                            shops.map((shop, index) => {
                                return this.renderShop(shop, index);
                            })
                        }
                    </ul>
                </SimpleScroll>
            </div>
        );
    }
}

ApartmentShop.propTypes = {
    shops: PropTypes.arrayOf(PropTypes.any),
    goMore: PropTypes.func,
};

ApartmentShop.defaultProps = {
    shops: [],
    goMore: () => null,
};
