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

const positionDataObj = {};

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

    itemArr && itemArr.map((item, index) => {
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

    positionDataObj[type] = firstObj;

    console.log(window.test = positionDataObj);
}

export function stuffAroundDataToPosition() {
    // 获取地理位置
    // return Promise.resolve([116, 39])
    return getCurrentPosition()
        .then((lonlatArr) => {
            if (lonlatArr) {
                window.isGeoLocation = true;
                window.lonlatArr = lonlatArr;
                const [lon, lat] = lonlatArr;
                const positionArroundObj = {
                    id: {
                        type: 'around',
                    },
                    text: '附近',
                    itemArr: [
                        {
                            text: '不限',
                            id: -1,
                            isCanCancel: true,
                        },
                        {
                            text: '1km',
                            id: {
                                lon,
                                lat,
                                distance: 1,
                            },
                            isCanCancel: true,
                        },
                        {
                            text: '2km',
                            id: {
                                lon,
                                lat,
                                distance: 2,
                            },
                            isCanCancel: true,
                        },
                        {
                            text: '3km',
                            id: {
                                lon,
                                lat,
                                distance: 3,
                            },
                            isCanCancel: true,
                        },
                    ],
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
    let positionDataArr = [];

    return Promise.all([
        _ajaxDistricts(),
        _ajaxSubways(),
    ])
        .then((datas) => {
            datas.forEach((data) => {
                stuffDataToPosition(data.arr, data.type);
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
