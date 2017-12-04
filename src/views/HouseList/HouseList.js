import React, { Component } from 'react';
import HeadShared from 'components/HouseDetail/HeadShared/HeadShared';
import HouseLists from 'components/HouseList/HouseLists/HouseLists';
import Service from 'lib/Service';
import './styles.less';

export default class HouseList extends Component {
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
                <HouseLists />
            </div>
        );
    }
}
