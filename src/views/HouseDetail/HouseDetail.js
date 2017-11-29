import React, { Component } from 'react';
import HeadShared from 'components/HouseDetail/HeadShared/HeadShared';
import RoomSlider from 'components/HouseDetail/RoomSlider/RoomSlider';
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
                <RoomSlider />
                HouseDetail
            </div>
        );
    }
}
