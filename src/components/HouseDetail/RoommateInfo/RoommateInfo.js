import React, { Component } from 'react';
import { divideArray } from 'lib/util';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-roommateinfo';

// this.state = {
//     roommates: [
//         {
//             roomNumber: 1,
//             gender: 'FEMALE',
//         },
//         {
//             roomNumber: 1,
//             gender: 'MALE',
//         },
//         {
//             roomNumber: 1,
//             gender: null,
//         },
//     ],
// };

export default function RoommateInfo(props) {
    const { className, roomateInfoArrData } = props;
    // 将室友数组，每三个划分一行
    const newRoommatesArr = divideArray(roomateInfoArrData, 3);

    let rommateInfoChildren = null;
    if (newRoommatesArr && newRoommatesArr.length) {
        rommateInfoChildren = newRoommatesArr.map((roommateRow, index) => {
            return <RoommateRow key={index} roommates={roommateRow} />
        });
    }
    return (
        <div className={`${classPrefix} ${className}`}>
            <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>室友信息</h1>
            <div className={`${classPrefix}-info`}>
                {
                    rommateInfoChildren
                }
            </div>
        </div>
    );
}

// 室友信息，一行三个室友
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
