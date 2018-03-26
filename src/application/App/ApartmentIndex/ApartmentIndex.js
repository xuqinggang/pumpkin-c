import React, { PureComponent } from 'react';

import {
    RoomSlider,
} from 'components/App/ShopDetail';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import { ApartmentIntro, ApartmentRecommend, ApartmentShop } from 'components/App/ApartmentIndex';

import { ajaxGetApartmentIndex } from './ajaxInitApartmentIndex';

import './styles.less';

const classPrefix = 'g-apartmentindex';

export default class ApartmentIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            brandApartments: {},
        };
    }

    componentDidMount() {
        ajaxGetApartmentIndex('sssss').then((brandApartments) => {
            this.setState({
                brandApartments,
            });
        });
    }

    render() {
        const { history } = this.props;
        const { brandApartments: { images, apartment, recommends, boutiqueShops } } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <HouseHead
                    history={history}
                    renderRight={() => (
                        <span className={`${classPrefix}-title f-singletext-ellipsis`}>品牌公寓</span>
                    )}
                />
                <RoomSlider images={images} />
                <div className="main">
                    <ApartmentIntro {...apartment} />
                </div>
                <ApartmentRecommend recommends={recommends} />
                <ApartmentShop shops={boutiqueShops} />
            </div>
        );
    }
}
