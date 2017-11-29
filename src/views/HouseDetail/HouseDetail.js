import React, { Component } from 'react';
import HeadShared from 'components/HouseDetail/HeadShared/HeadShared';
import './styles.less';

export default class HouseDetail extends Component {
    handleTouchTap() {
        console.log('handleTouchTap')
    }
    handleClick() {
        console.log('handleClick')
    }
    render() {
        return (
            <div className="test" onTouchTap={this.handleTouchTap} onClick={this.handleClick}>
                <HeadShared />
                HouseDetail
            </div>
        );
    }
}
