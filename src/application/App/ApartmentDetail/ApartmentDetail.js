import React, { PureComponent } from 'react';

import {
    ApartmentHouseList,
    Location,
    RoomSlider,
} from 'components/App/ApartmentDetail';
import ApartmentIntro from 'components/App/HouseDetail/HouseDetailIndex/ApartmentIntro/ApartmentIntro';

import { execWxShare } from 'lib/wxShare';
import { ajaxGetApartmentDetail } from './ajaxInitApartmentDetail';

import './styles.less';

const classPrefix = 'g-apartmentdetail';

export default class ApartmentDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            apartmentDetailData: {},
        };

        this.shopId = props.match.params.shopId;

        window.setStore('shopId', {
            shopId: this.shopId,
        });
    }

    componentWillMount() {
        // TODO store 最后统一管理, 避免以后多了会覆盖以前的
        // 如果store没有数据，则请求
        const apartmentDetailStore = window.getStore('apartmentDetail');
        const curHouseDetailData = apartmentDetailStore && apartmentDetailStore[this.shopId];
        if (curHouseDetailData) {
            this.setState({
                apartmentDetailData: curHouseDetailData,
            });

            this.wxShare();

            return;
        }

        ajaxGetApartmentDetail(this.shopId).then(apartmentDetailData => {
            this.setState({
                apartmentDetailData,
            });

            window.setStore('apartmentDetail', {
                [this.shopId]: apartmentDetailData,
            });

            this.wxShare();
        });
    }

    componentDidMount() {
        // this.wxShare();
    }

    wxShare() {
        // 分享
        execWxShare({
            title: '上南瓜租房，找品牌公寓',
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '南瓜租房，只租真房源！',
        });
    }

    get apartmentIntroData() {
        const { apartmentDetailData } = this.state;
        const { name, intro } = apartmentDetailData;   
        return {
            name,
            intro,
        }
    }

    render() {
        const { apartmentDetailData } = this.state;
        const { images, blockName } = apartmentDetailData;

        return (
            <div className={`${classPrefix}`}>
                <RoomSlider images={images} />
                <Location blockName={blockName} />
                <ApartmentIntro 
                    withoutImage={true} 
                    apartmentIntroData={this.apartmentIntroData} 
                />
                <ApartmentHouseList />
            </div>
        );
    }
}
