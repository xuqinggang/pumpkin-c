import React, { PureComponent } from 'react';

import { RoomSlider } from 'components/App/ShopDetail';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import {
    ApartmentIntro,
    ApartmentRecommend,
    ApartmentShop,
    RentUnitList,
} from 'components/App/ApartmentIndex';
import { goCommentList, goShopList, goApartmentDetail } from 'application/App/routes/routes';
import { Route, Switch } from 'react-router';

import ApartmentDetail from '../ApartmentDetail';
import { ajaxGetApartmentIndex } from '../ajaxInitApartmentIndex';

import './styles.less';

const classPrefix = 'g-apartmentindex';

export default class ApartmentIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            brandApartments: {},
        };
    }

    apartmentId = this.props.match.params.apartmentId
    goCommentList = () => goCommentList(this.props.history)(this.apartmentId)
    goShopList = goShopList(this.props.history)
    goApartmentDetail = () => goApartmentDetail(this.props.history)(this.apartmentId)

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
        const { intro, authentications } = apartment || {};
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
        );
    }
}
