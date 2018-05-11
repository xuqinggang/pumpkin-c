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
    goApartmentHouseList,
} from 'application/App/routes/routes';
import { Route, Switch } from 'react-router';

import { dynamicDocTitle } from 'lib/util';
import { isLikeNativeView } from 'lib/const';
import { execWxShare } from 'lib/wxShare';
import { openSchema } from 'lib/webviewBridge';
import initStore from 'application/App/initStore';

import ApartmentDetail from '../ApartmentDetail';
import { ajaxGetApartmentIndex } from '../ajaxInitApartmentIndex';
import getCurrentPosition from 'lib/geolocation';
import { initApartmentListState } from 'application/App/HouseList/RealHouseList';

import './styles.less';

const classPrefix = 'g-apartmentindex';

const urlStoreKey = 'apartmentHouseUrl';

export default class ApartmentIndex extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            brandApartments: {},
        };

        getCurrentPosition().then((data) => {
            const [lon, lat] = data;
            window.setStore('location', {
                lon,
                lat,
            });
        }).catch(() => {
            window.setStore('location', {
                lon: 23,
                lat: 24,
            });
        });
    }

    wxShare = () => this.setShareData((data) => {
        execWxShare(data);
    })

    setShareData = (callback) => {
        const {
            brandApartments: {
                apartment,
                banners,
            },
        } = this.state;

        const imgUrl = (banners && banners[0] && `${banners[0].avatar}/imageView/v1/thumbnail/200x200`) ||
                'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200';


        const data = {
            title: `${apartment.name}`,
            link: window.location.href.split('#')[0],
            imgUrl,
            desc: '住品牌公寓，上南瓜租房!',
            slogan: '住品牌公寓，上南瓜租房',
            isWeb: true,
        };
        callback(data);
    }

    setShareForIOS = () => this.setShareData((data) => {
        window.postMessage(JSON.stringify({
            data,
            event: 'CUSTOM_SHARE',
        }), '*');
    })

    apartmentId = this.props.match.params.apartmentId
    goCommentList = () => goCommentList(this.props.history)(this.apartmentId)
    goExclusiveShop = () => {
        goExclusiveShop(this.props.history)(`z${this.apartmentId}`);
    }
    goApartmentDetail = () => goApartmentDetail(this.props.history)(this.apartmentId)
    goHouseList = (isNearby = false) => {
        const filterStore = window.getStore('filter') || { filterParamsObj: {} };
        const { apartmentId } = this;

        if (isLikeNativeView()) {
            openSchema(`nangua://api.nanguazufang.cn/main?fineUnitFilter=${JSON.stringify({ ...filterStore, apartmentId })}`);
            return;
        }

        initStore();
        initApartmentListState();
        const urlStore = window.getStore('url');
        let filterSearch = `?apartment=${apartmentId}`;
        if (isNearby) {
            filterSearch = `${filterSearch}&nearby=3`;
        }
        window.setStore(urlStoreKey, {
            ...urlStore,
            filterSearch,
        });
        goApartmentHouseList(this.props.history)(true);
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
                    !isLikeNativeView() &&
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
                    <RentUnitList list={nearbyRentUnits} title="附近房源" goMore={() => this.goHouseList(true)} />
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
            }, () => {
                //  得到公寓信息再注册微信分享内容
                this.wxShare();
                this.setShareForIOS();
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
