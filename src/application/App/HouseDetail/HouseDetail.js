import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom'

import HouseHead from 'components/App/HouseDetail/HouseHead/HouseHead';
import RoomSlider from 'components/App/HouseDetail/RoomSlider/RoomSlider';
import HouseProfile from 'components/App/HouseDetail/HouseProfile/HouseProfile';
import HouseBrief from 'components/App/HouseDetail/HouseBrief/HouseBrief';
import HouseTags from 'components/App/HouseDetail/HouseTags/HouseTags';
import HouseFurniture from 'components/App/HouseDetail/HouseFurniture/HouseFurniture';
import HouseIntro from 'components/App/HouseDetail/HouseIntro/HouseIntro';
import HouseTraffic from 'components/App/HouseDetail/HouseTraffic/HouseTraffic';
import ApartmentIntro from 'components/App/HouseDetail/ApartmentIntro/ApartmentIntro';
import RoommateInfo from 'components/App/HouseDetail/RoommateInfo/RoommateInfo';
import CommunityIntro from 'components/App/HouseDetail/CommunityIntro/CommunityIntro';
import HouseReport from 'components/App/HouseReport/HouseReport';
// Shared
import ContactButler from 'Shared/ContactButler/ContactButler';
import OpenNative from 'Shared/OpenNative/OpenNative';

import { dynamicDocTitle } from 'lib/util';
import { execWxShare } from 'lib/wxShare';
import ajaxInitHouseDetail from './ajaxInitHouseDetail';

import './styles.less';

export default class HouseDetail extends PureComponent {
    render() {
        const {
            url,
        } = this.props.match;

        return (
            [
                <Route exact path={`${url}/:rentUnitId`} component={HouseDetailIndex} key={0} />,
                <Route exact path={`${url}/:rentUnitId/report`} component={HouseReport} key={1}/>
            ]
        );
    }
}

const classPrefix = 'g-housedetail';

class HouseDetailIndex extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            houseDetailData: {},
        };

        this.rentUnitId = props.match.params.rentUnitId;
    }

    componentWillMount() {
        // 如果store没有数据，则请求
        const houseDetailStore = window.getStore('houseDetail');
        let curHouseDetailData = houseDetailStore && houseDetailStore[this.rentUnitId];
        if (curHouseDetailData) {
            this.setState({
                houseDetailData: curHouseDetailData,
            });

            this.callWxShareAgain(curHouseDetailData);

            return;
        }

        // 请求
        ajaxInitHouseDetail(this.rentUnitId)
            .then((houseDetailData) => {
                this.setState({
                    houseDetailData,
                });

                window.setStore('houseDetail', {
                    [this.rentUnitId]: houseDetailData,
                });

                this.callWxShareAgain(houseDetailData);
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    // 每次进来一定要再次调用微信分享
    callWxShareAgain(houseDetailData) {
        const { sliderImgArr, houseProfileData } = houseDetailData;
        const title = houseProfileData.title;
        const imgInfo = sliderImgArr && sliderImgArr[0].imgInfo && sliderImgArr[0].imgInfo[0];

        // 分享
        execWxShare({
            title: title + '-南瓜租房北京租房',
            link: window.location && window.location.href.split('#')[0],
            imgUrl: imgInfo && imgInfo.img,
            desc: '南瓜租房，只租真房源！',
        });
        // 动态更改标题
        dynamicDocTitle(title + '-南瓜租房北京租房');
    }

    componentWillUnmount() {
        // 把除此房源外的其余房源详情页数据给清除
        const houseDetailStore = window.getStore('houseDetail');
        const currentHouseDetailData = houseDetailStore && houseDetailStore[this.rentUnitId];
        window.setStore('houseDetail', null);
        window.setStore('houseDetail', {
            [this.rentUnitId]: currentHouseDetailData,
        });
    }

    render() {
        const {
            match,
            history,
        } = this.props;

        const {
            // 头部，收藏信息
            headData,
            // 头部slider轮播图
            sliderImgArr,
            // house头部,title,付款数据
            houseProfileData,
            // house tags
            houseTagsArrData,
            // house brief
            houseBriefData,
            // 家具slider
            furnitureSliderArrData,
            // 房源介绍
            houseIntroStr,
            // 公寓介绍相关信息
            apartmentIntroData,
            // 室友相关信息
            roomateInfoArrData,
            // 小区相关信息
            communityIntroData,
            // 管家信息
            contactButlerData,
            // 周边及交通,经纬度
            houseTrafficData,
            // 额外信息
            extraData,
        } = this.state.houseDetailData;

        const style = {
            display: this.state.show ? 'block' : 'none',
            marginTop: '20px',
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
        };

        const {
            rentalType,
        } = extraData || {};

        return (
            <div className={`${classPrefix}`} ref={ (dom) => { this.wrapDom = dom; } }>
                <OpenNative schema={`api.nanguazufang.cn/main/rentUnit?rentUnitId=${this.rentUnitId}`} />
                <HouseHead
                    headData={headData || {}}
                    rentUnitId={this.rentUnitId}
                    history={history}
                    match={match}
                />
                <RoomSlider sliderImgArr={sliderImgArr || []} />
                <HouseProfile
                    className={`g-housedetail-module-padding ${classPrefix}-houseprofile`}
                    houseProfileData={houseProfileData || {}}
                    houseTrafficData={houseTrafficData || {}}
                />
                <HouseTags
                    className={`g-housedetail-module-padding ${classPrefix}-housetags`}
                    houseTagsArrData={houseTagsArrData || []}
                />
                <HouseBrief
                    houseBriefData={houseBriefData || {}}
                    className={`${classPrefix}-housebrief`}
                />
                <HouseFurniture furnitureSliderArrData={furnitureSliderArrData || []} />
                <HouseIntro
                    className={`g-housedetail-module-padding ${classPrefix}-houseinfo`}
                    houseIntroStr={houseIntroStr}
                />
                <HouseTraffic className={`${classPrefix}-housetraffic`} houseTrafficData={houseTrafficData || {}} />
                <ApartmentIntro
                    className={`g-housedetail-module-padding ${classPrefix}-apartnameintro`}
                    apartmentIntroData={apartmentIntroData || {}}
                />
                {
                    rentalType === 'SHARED' ? (
                        <RoommateInfo
                            className={`g-housedetail-module-padding ${classPrefix}-roommateinfo`}
                            roomateInfoArrData={roomateInfoArrData || []}
                        />
                    ) : null
                }
                <CommunityIntro
                    className={`g-housedetail-module-padding ${classPrefix}-communityinfo`}
                    communityIntroData={communityIntroData || {}}
                />
                <ContactButler contactButlerData={contactButlerData || {}} />
            </div>
        );
    }
}
