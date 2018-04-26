import React, { PureComponent } from 'react';

import { RoomSlider } from 'components/App/ShopDetail';
import EasyHead from 'Shared/EasyHead';
import {
    ApartmentIntro,
    ApartmentRecommend,
    ApartmentShop,
    RentUnitList,
} from 'components/App/ApartmentIndex';
import {
    goCommentList,
    goExclusiveShop,
    goApartmentDetail,
    goHouseList,
} from 'application/App/routes/routes';
import { Route, Switch } from 'react-router';

import ApartmentDetail from '../ApartmentDetail';
import { ajaxGetApartmentIndex } from '../ajaxInitApartmentIndex';
import { dynamicDocTitle } from 'lib/util';
import { isRmHead, isNanguaApp } from 'lib/const';
import initStore from 'application/App/initStore';

const isLikeNativeView = () => isRmHead() && isNanguaApp();

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
    goExclusiveShop = () => {
        goExclusiveShop(this.props.history)(`z${this.apartmentId}`);
    }
    goApartmentDetail = () => goApartmentDetail(this.props.history)(this.apartmentId)
    goHouseList = () => {
        const filterStore = window.getStore('filter') || { filterParamsObj: {} };
        const { apartmentId } = this;

        if (isLikeNativeView()) {
            window.location.href =
                `nangua://api.nanguazufang.cn/main?rentUnitFilter=${JSON.stringify({ ...filterStore, apartmentId })}`;
            return;
        }

        initStore();
        const urlStore = window.getStore('url');
        window.setStore('url', {
            ...urlStore,
            filterSearch: `?apartment=${apartmentId}`,
        });
        goHouseList(this.props.history)();
    }

    renderIndex() {
        const { history, match } = this.props;
        const {
            brandApartments: {
                banners: links,
                apartment,
                recommends,
                boutiqueShops,
                boutiqueRentUnits,
                nearbyRentUnits,
            },
        } = this.state;
        return (
            <div className={`${classPrefix}`}>
                {
                    !isRmHead() &&
                    <EasyHead
                        renderRight={() => (
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>品牌公寓</span>
                        )}
                    />
                }
                <RoomSlider links={links} />
                <div className="content-padding">
                    <ApartmentIntro
                        {...apartment}
                        goCommentList={this.goCommentList}
                        goDetail={this.goApartmentDetail}
                    />
                </div>
                <ApartmentRecommend recommends={recommends} />
                <ApartmentShop shops={boutiqueShops} goMore={this.goExclusiveShop} />
                <div className="content-padding">
                    <RentUnitList list={boutiqueRentUnits} title="精品房源" goMore={this.goHouseList} />
                    <RentUnitList list={nearbyRentUnits} title="附近房源" goMore={this.goHouseList} />
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
        // TODO can move to routes
        dynamicDocTitle('品牌公寓');
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
