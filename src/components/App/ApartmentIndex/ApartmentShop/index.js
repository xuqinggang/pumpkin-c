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
        )
    }

    render() {
        const {
            shops,
        } = this.props;

        return (
            <div className={classnames(classPrefix)}>
                <TitleWithMore title="精品门店" goMore={() => console.log('more')} />
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
};

ApartmentShop.defaultProps = {
    shops: [],
};
