import React, { PureComponent } from 'react';

import {
    ApartmentHouseList,
    Location,
    RoomSlider,
} from 'components/App/ApartmentDetail';
import ApartmentIntro from 'components/App/HouseDetail/HouseDetailIndex/ApartmentIntro/ApartmentIntro';

import { execWxShare } from 'lib/wxShare';

import './styles.less';

const classPrefix = 'g-apartmentdetail';

// MOCK data
const apartmentIntroData = {
    name: '乐乎公寓',
    intro: '燕郊现代服务产业园启动区分产业办公区和生活配套区两部分，其中产业办公区占地188亩，总建筑面积36万平米，其中地上建筑面积22万平',
}

export default class ApartmentDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.wxShare();
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

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>公寓详情页</p>
                <RoomSlider />
                <Location />
                <ApartmentIntro apartmentIntroData={apartmentIntroData} />
                <ApartmentHouseList />
            </div>
        );
    }
}
