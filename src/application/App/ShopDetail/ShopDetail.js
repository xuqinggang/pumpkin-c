import React, { PureComponent } from 'react';

import {
    RoomTypeList,
    Location,
    RoomSlider,
} from 'components/App/ShopDetail';
import ApartmentIntro from 'components/App/HouseDetail/HouseDetailIndex/ApartmentIntro/ApartmentIntro';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';

import { execWxShare } from 'lib/wxShare';
import { ajaxGetApartmentDetail } from './ajaxInitShopDetail';
import { dynamicDocTitle } from 'lib/util';
import { stuffTotalFloorTOCentralHouses, getLocation } from './dataAdapter';
import { isLikeNativeView } from 'lib/const';
import { postRouteChangeToIOS } from 'lib/patchNavChangeInIOS';
import { goApartment } from 'application/App/routes/routes';

import './styles.less';

const classPrefix = 'g-shopdetail';

export default class ShopDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            apartmentDetailData: {},
        };

        this.shopId = props.match.params.shopId;

        window.setStore('shopId', {
            shopId: this.shopId,
        });

        if (isLikeNativeView()) {
            postRouteChangeToIOS({
                canGoBack: true,
                url: window.location.href,
            });
        }
    }

    goApartment = () => {
        const { history } = this.props;
        const { apartmentDetailData } = this.state;
        goApartment(history)(apartmentDetailData.apartmentId);
    }

    handleJumpMapTap = () => {
        // 经纬度
        const { apartmentDetailData } = this.state;
        const { lon, lat } = apartmentDetailData;
        
        if (lon && lat) {
            const pos = `${lon},${lat}`;
        
            const urlInfo = window.getStore('url');
            const urlPrefix = urlInfo && urlInfo.urlPrefix;

            window.location.href = `${urlPrefix}/map?pos=${pos}`;
        }
    }

    componentWillMount() {
        // TODO store 最后统一管理, 避免以后多了会覆盖以前的
        // 如果store没有数据，则请求
        const apartmentDetailStore = window.getStore('apartmentDetail');
        const curHouseDetailData = apartmentDetailStore && apartmentDetailStore[this.shopId];
        if (curHouseDetailData) {
            this.setState({
                apartmentDetailData: curHouseDetailData,
            }, () => {
                this.wxShare();
            });

            return;
        }

        ajaxGetApartmentDetail(this.shopId).then(apartmentDetailData => {
            this.setState({
                apartmentDetailData,
            }, () => {
                this.wxShare();
            });

            window.setStore('apartmentDetail', {
                [this.shopId]: apartmentDetailData,
            });
        });
    }

    componentDidMount() {
        dynamicDocTitle('精品公寓');
    }

    wxShare() {
        const { apartmentDetailData } = this.state;
        const { name, images, minPrice, address } = apartmentDetailData;
        // 分享
        execWxShare({
            title: name || '精品公寓',
            link: window.location.href.split('#')[0],
            imgUrl: (images && images[0]) || 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: `${minPrice} ${address}`,
        });
    }

    get apartmentIntroData() {
        const { apartmentDetailData } = this.state;
        const { apartmentName, apartmentIntro } = apartmentDetailData;   
        return {
            name: '公寓介绍',
            intro: apartmentIntro,
        }
    }

    get centralHouses() {
        const { apartmentDetailData } = this.state;
        const { centralHouses, totalFloor } = apartmentDetailData;
        return stuffTotalFloorTOCentralHouses(centralHouses || [], totalFloor);
    }

    render() {
        const { history } = this.props;

        const { apartmentDetailData } = this.state;
        const { 
            images, 
            apartmentName, 
            name, 
            address,
            totalOnsaleCount,
            distance,
            districtName,
            subwayName,
            stationName,
        } = apartmentDetailData;

        const location = getLocation(districtName, subwayName, stationName, distance);

        return (
            <div className={`${classPrefix}`}>
                {
                    !isLikeNativeView() ?
                        <HouseHead
                            history={history}
                            renderRight={() => (
                                <span className={`${classPrefix}-title f-singletext-ellipsis`}>{name}</span>
                            )}
                        /> :
                        null
                }
                <RoomSlider images={images} totalOnsaleCount={totalOnsaleCount} />
                <div className={`${classPrefix}-module ${classPrefix}-location`}>
                    <Location
                        apartmentName={apartmentName} 
                        address={location} 
                        onTouchTap={this.handleJumpMapTap}
                        goApartment={this.goApartment}
                    />
                </div>
                <div className={`${classPrefix}-module ${classPrefix}-intro`}>
                    <ApartmentIntro
                        withoutImage={true}
                        apartmentIntroData={this.apartmentIntroData}
                    />
                </div>
                <div className={`${classPrefix}-module ${classPrefix}-roomtype`}>
                    <RoomTypeList centralHouses={this.centralHouses} />
                </div>
            </div>
        );
    }
}
