import getCurrentPosition from 'lib/geolocation';
import Service from 'lib/Service';

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

// 以id为索引的对象存储
// const Test = {
//     subways: {
//         id1: {
//             text: '1号线',
//             sub: {
//                 subid1: 'xx1站',
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

function stuffDataToPosition(itemArr, type) {
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

    return {
        [type]: firstObj,
    };
}

export function stuffAroundDataToPosition() {
    // 获取地理位置
    return Promise.resolve([116, 39])
    // return getCurrentPosition()
        .then((lonlatArr) => {
            if (lonlatArr) {
                window.isGeoLocation = true;
                window.lonlatArr = lonlatArr;
                const [lon, lat] = lonlatArr;
                const lonlatStr = `${lon},${lat}`;
                const positionArroundObj = {
                    around: {
                        '0': {
                            text: '不限',
                            sub: null,
                        },
                        [`${lonlatStr},1`]: {
                            text: '1km',
                            sub: null,
                        },
                        [`${lonlatStr},2`]: {
                            text: '2km',
                            sub: null,
                        },
                        [`${lonlatStr},3`]: {
                            text: '3km',
                            sub: null,
                        },
                    },
                };
                return positionArroundObj;
            } else {
                throw new Error('lonlatArr is null');
            }
        })
        .catch((err) => {
            window.isGeoLocation = false;
            throw new Error(err);
        });
}

export function ajaxInitPositionData() {
    // 位置筛选的数据
    const positionDataObj = {};
    return Promise.all([
        _ajaxDistricts(),
        _ajaxSubways(),
    ])
        .then((datas) => {
            datas.forEach((data) => {
                Object.assign(positionDataObj, stuffDataToPosition(data.arr, data.type));
            });

            return positionDataObj;

            // 手动添加附近相关数据
            // 如果地理位置权限允许，则添加附近数据
            // stuffAroundDataToPosition()
            //     .then((positionArroundObj) => {
            //         positionData.around = positionArroundObj;
            //         resolve(positionData);
            //     })
            //     .catch((err) => {
            //         resolve(positionData);
            //     })
        })
        .catch((err) => {
            console.log('ajaxInitPositionData err:', err);
        })
}

function _ajaxDistricts() {
    return Service.get(`/api/v1/common/districts`)
        .then((data) => {
            if (data.code == 200) {
                const districtsArr = data.data.districts;
                return {
                    type: 'districts',
                    arr: districtsArr,
                };
            }
        });
}

function _ajaxSubways() {
    return Service.get(`/api/v1/common/subways`)
        .then((data) => {
            if (data.code === 200) {
                const subwaysArr = data.data.subways;
                return {
                    type: 'subways',
                    arr: subwaysArr,
                };
            }
        })
        .catch((err) => {
            throw new Error(err);
        })
}
