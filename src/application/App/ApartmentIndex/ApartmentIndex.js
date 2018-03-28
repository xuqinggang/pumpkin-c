import React, { PureComponent } from 'react';

import {
    RoomSlider,
} from 'components/App/ShopDetail';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import {
    ApartmentIntro,
    ApartmentRecommend,
    ApartmentShop,
    RentUnitList,
} from 'components/App/ApartmentIndex';
import { withHistory } from 'application/App/routes';
import { createCommentListPath } from 'application/App/Comment';

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

    withHistory = withHistory(this.props.history)
    goCommentList = () => this.withHistory(createCommentListPath)('90909090')

    componentDidMount() {
        ajaxGetApartmentIndex('sssss').then((brandApartments) => {
            this.setState({
                brandApartments,
            });
        });
    }

    render() {
        const { history } = this.props;
        const {
            brandApartments: {
                images,
                apartment,
                recommends,
                boutiqueShops,
                boutiqueRentUnits,
                nearbyRentUnits,
            },
        } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <HouseHead
                    history={history}
                    renderRight={() => (
                        <span className={`${classPrefix}-title f-singletext-ellipsis`}>品牌公寓</span>
                    )}
                />
                <RoomSlider images={images} />
                <div className="content-padding">
                    <ApartmentIntro 
                        {...apartment}
                        goCommentList={this.goCommentList}
                    />
                </div>
                <ApartmentRecommend recommends={recommends} />
                <ApartmentShop shops={boutiqueShops} />
                <div className="content-padding">
                    <RentUnitList list={boutiqueRentUnits} title="精品房源" goMore={this.goCommentList} />
                    <RentUnitList list={nearbyRentUnits} title="附近房源" goMore={this.goCommentList} />
                </div>
            </div>
        );
    }
}
