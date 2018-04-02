import React, { PureComponent } from 'react';

import { RoomSlider } from 'components/App/ShopDetail';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import {
    ApartmentIntro,
    ApartmentRecommend,
    ApartmentShop,
    RentUnitList,
} from 'components/App/ApartmentIndex';
import ApartmentDetail from '../ApartmentDetail';

import { withHistory } from 'application/App/routes';
import { createCommentListPath } from 'application/App/Comment';
import { Route, Switch } from 'react-router';
import { ajaxGetApartmentIndex } from '../ajaxInitApartmentIndex';

import './styles.less';

const classPrefix = 'g-apartmentindex';
const createShopListPath = () => '/shop/list';
const createApartmentDeatilPath = apartmentId => `/apartment/${apartmentId}/detail`;

export default class ApartmentIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            brandApartments: {},
        };
    }

    apartmentId = this.props.match.params.apartmentId
    withHistory = withHistory(this.props.history)
    goCommentList = () => this.withHistory(createCommentListPath)(this.apartmentId)
    goShopList = this.withHistory(createShopListPath)
    goApartmentDetail = () => this.withHistory(createApartmentDeatilPath)(this.apartmentId)

    renderIndex() {
        const { history, match } = this.props;
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
                        goDetail={this.goApartmentDetail}
                    />
                </div>
                <ApartmentRecommend recommends={recommends} />
                <ApartmentShop shops={boutiqueShops} />
                <div className="content-padding">
                    <RentUnitList list={boutiqueRentUnits} title="精品房源" goMore={this.goShopList} />
                    <RentUnitList list={nearbyRentUnits} title="附近房源" goMore={this.goShopList} />
                </div>
            </div>
        );
    }

    renderDetail() {
        const {
            brandApartments: {
                apartment,
            },
        } = this.state;
        const { intro, authentications } = apartment;
        return (
            <ApartmentDetail intro={intro} authentications={authentications} />
        );
    }

    componentDidMount() {
        const { match: { params: { apartmentId } } } = this.props;
        ajaxGetApartmentIndex(apartmentId).then((brandApartments) => {
            this.setState({
                brandApartments,
            });
        });
    }

    render() {
        const { url } = this.props.match;

        return (
            <Switch>
                <Route
                    exact
                    path={url}
                    render={() => this.renderIndex()}
                />
                <Route
                    exact
                    path={`${url}/detail`}
                    render={() => this.renderDetail()}
                />
            </Switch>
        )
    }
}
