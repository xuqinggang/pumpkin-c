import './styles.less';
import React, { Component } from 'react';
import HeadShared from 'components/App/HouseDetail/HeadShared/HeadShared';
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
// Shared
import ContactButler from 'Shared/ContactButler/ContactButler';
// ajax
import ajaxInitHouseDetail from './ajaxInitHouseDetail';

import Animate from 'rc-animate';


const classPrefix = 'g-housedetail';

export default class HouseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            houseDetailData: {},
        };
    } 

    handleTouchTap() {
    }

    // handleClick = () => {
    //     this.setState({
    //         show: true,
    //     });
    // }

    componentDidMount() {
        ajaxInitHouseDetail()
            .then((houseDetailData) => {
                this.setState({
                    houseDetailData,
                })
            })
    }

    render() {
        const { 
            // 头部slider轮播图
            sliderImgArr,
            // house头部,title,付款数据
            houseProfileData,
            // house tags
            houseTagsArrData,
            // house brief
            houseBriefArrData,
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
        } = this.state.houseDetailData;

        const style = {
            display: this.state.show ? 'block' : 'none',
            marginTop: '20px',
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
        };
        console.log('RoomSlider render HouseDetail', sliderImgArr, houseProfileData, contactButlerData);
        return (
            <div className="test" onTouchTap={this.handleTouchTap}>
                <HeadShared />
                <hr className="u-housedetail-partline"/>
                {
                    // <RoomSlider sliderImgArr={sliderImgArr || []} />
                    // <HouseProfile
                    //     className={`g-housedetail-module-padding ${classPrefix}-houseprofile`}
                    //     houseProfileData={houseProfileData || {}}
                    // />
                    //     <HouseTags
                    //         className={`g-housedetail-module-padding ${classPrefix}-housetags`}
                    //         houseTagsArrData={houseTagsArrData || []}
                    //     />
                    //     <HouseBrief
                    //         houseBriefArrData={houseBriefArrData || []}
                    //         className={`${classPrefix}-housebrief`}
                    //     />
                }
                {
                    // <HouseProfile />
                    <HouseTraffic />
                }
                {
                    // <HouseFurniture furnitureSliderArrData={furnitureSliderArrData || []} />
                    // <HouseIntro
                    //     className={`g-housedetail-module-padding ${classPrefix}-houseinfo`}
                    //     houseIntroStr={houseIntroStr}
                    // />
                    //     <ApartmentIntro
                    //         className={`g-housedetail-module-padding ${classPrefix}-apartnameintro`}
                    //         apartmentIntroData={apartmentIntroData || {}}
                    //     />
                    //     <RoommateInfo
                    //         className={`g-housedetail-module-padding ${classPrefix}-roommateinfo`}
                    //         roomateInfoArrData={roomateInfoArrData || []}
                    //     />
                    //     <CommunityIntro
                    //         className={`g-housedetail-module-padding ${classPrefix}-communityinfo`}
                    //         communityIntroData={communityIntroData || {}}
                    //     />
                }
                <button style={{fontSize: '50px'}} onClick={this.handleClick}>adsf</button>
                <Animate
                    component=""
                    transitionName="fade"
                >
                    {
                        this.state.show ? 
                            <div key="1" style={style}/> : null
                    }
                </Animate>
                {
                    // <ContactButler contactButlerData={contactButlerData || {}} />
                }
            </div>
        );
    }
}
