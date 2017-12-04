import React, { Component } from 'react';
import HeadShared from 'components/HouseDetail/HeadShared/HeadShared';
import RoomSlider from 'components/HouseDetail/RoomSlider/RoomSlider';
import HouseProfile from 'components/HouseDetail/HouseProfile/HouseProfile';
import HouseIntro from 'components/HouseDetail/HouseIntro/HouseIntro';
import HouseTraffic from 'components/HouseDetail/HouseTraffic/HouseTraffic';
import ApartmentIntro from 'components/HouseDetail/ApartmentIntro/ApartmentIntro';
import RoommateInfo from 'components/HouseDetail/RoommateInfo/RoommateInfo';
import CommunityIntro from 'components/HouseDetail/CommunityIntro/CommunityIntro';
import Service from 'lib/Service';

import './styles.less';

export default class HouseDetail extends Component {
    handleTouchTap() {
        console.log('handleTouchTap')
    }
    handleClick() {
        console.log('handleClick')
    }
    componentDidMount() {
        Service.get('/v1/rentUnits/11')
            .then((data) => {
                console.log('data', data)
            })
    }
    render() {
        return (
            <div className="test" onTouchTap={this.handleTouchTap} onClick={this.handleClick}>
                <HeadShared />
                <hr className="u-housedetail-partline"/>
                <RoomSlider />
                {
                    // <HouseProfile />
                    //     <HouseIntro className="g-housedetail-module-padding" />
                    //     <HouseTraffic />
                    //     <ApartmentIntro className="g-housedetail-module-padding" />
                    //     <RoommateInfo className="g-housedetail-module-padding" />
                    //     <CommunityIntro className="g-housedetail-module-padding" />
                }
                HouseDetail
            </div>
        );
    }
}
