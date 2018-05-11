/* @flow */

import { getObjectKeyByIndex } from 'lib/util';

const TypeMapName = {
    districts: {
        typeName: 'districtName',
        subTypeName: 'circleName',
        typeId: 'districtId',
        subTypeId: 'circleId',
        secondIndex: 'circles',
    },
    subways: {
        typeName: 'subwayName',
        subTypeName: 'stationName',
        typeId: 'subwayId',
        subTypeId: 'stationId',
        secondIndex: 'stations',
    },
};

// originArr: [{arr: [], type: 'subways'}, {}]
// distObj:
// {
//     subways: {
//         id1: {
//             text: '1号线',
//             sub: {
//                 subid1: 'xx1站',
//                 subid2: 'xx2站',
//             },
//         },
//         id2: {
//             text: '2号线',
//             sub: {
//                 subid1: 'xx1站',
//             },
//         },
//     },
// };
export function dataAdapterPostion(originArr: []) {
    const distObj = {};

    originArr.forEach((originItem) => {
        const type = getObjectKeyByIndex(originItem, 0);
        const itemArr = originItem[type];

        const typeNameInfo = TypeMapName[type];
        // 一级对象
        const firstObj = {
            '0': {
                text: '不限',
                sub: null,
                isCanCancel: true,
            },
        };

        itemArr && itemArr.forEach((item) => {
            const {
                typeName,
                subTypeName,
                typeId,
                subTypeId,
                secondIndex,
            } = typeNameInfo;

            firstObj[item[typeId]] = {
                text: item[typeName],
                sub: null,
            };

            // 原数组的二级
            const tmpSecondItemArr = item[secondIndex];
            // 二级对象
            const secondObj = {
                '0': '不限',
            };
            tmpSecondItemArr && tmpSecondItemArr.forEach((tmpSecondItem) => {
                secondObj[tmpSecondItem[subTypeId]] = tmpSecondItem[subTypeName];
            });

            firstObj[item[typeId]].sub = secondObj;
        });

        distObj[type] = firstObj;
    });

    return distObj;
}
