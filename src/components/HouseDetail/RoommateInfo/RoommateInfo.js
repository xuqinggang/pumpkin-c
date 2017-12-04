import React, { Component } from 'react';
import { divideArray } from 'lib/util';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-roommateinfo';

class RoommateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roommates: [
                {
                    roomNumber: 1,
                    gender: 'FEMALE',
                },
                {
                    roomNumber: 1,
                    gender: 'MALE',
                },
                {
                    roomNumber: 1,
                    gender: null,
                },
            ],
        };
    }
    renderRoommateInfo() {
        const roommates = this.state.roommates;
        const newRoommatesArr = divideArray(roommates, 3);
        console.log(newRoommatesArr)
        return newRoommatesArr.map((roommateRow, index) => {
            return <RoommateRow key={index} roommates={roommateRow} />
        })
    }
    render() {
        const { className } = this.props;
        return (
            <div className={`${classPrefix} ${className}`}>
                <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>室友信息</h1>
                <div className={`${classPrefix}-info`}>
                    {
                        this.renderRoommateInfo()
                    }
                </div>
            </div>
        );
    }
}

function RoommateRow(props) {
    const { roommates } = props;
    return (
        roommates && roommates.length ? (
            <ul className={'g-grid-row f-flex-justify-between'}>
                {
                    roommates.map((roommate, index) => {
                        const imgClass = classnames(`${classPrefix}-item-img`, {
                            'img-female': roommate.gender == 'FEMALE',
                            'img-male': roommate.gender == 'MALE',
                            'img-no': !(roommate.gender),
                        }, ' f-display-block');
                        return (
                            <li key={index}>
                                <span className={imgClass} src="" alt="" />
                                <span className={`${classPrefix}-item-text s-housedetail-introtext f-display-block`}>0{roommate.roomNumber}卧室</span>
                            </li>
                        );
                    })
                }
            </ul>
        ) : null
    );
}

export default RoommateInfo;
