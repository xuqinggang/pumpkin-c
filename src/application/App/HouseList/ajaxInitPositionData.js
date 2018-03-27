import getCurrentPosition from 'lib/geolocation';
import Service from 'lib/Service';

const Map = {
    districts: {
        first: 'district',
        second: 'circle',
        text: '区域',
    },
    subways: {
        first: 'subway',
        second: 'station',
        text: '地铁',
    },
};


function stuffDataToPosition(itemArr, type, positionDataArr) {
    let firstItemsArr = itemArr && itemArr.map((item, index) => {
        // 第一级的item
        const itemFirst = {
            text: item[`${Map[type].first}Name`],
            id: item[`${Map[type].first}Id`],
            itemArr: [],
        };

        const secondItemsArr = item[`${Map[type].second}s`];
        const newSecondItemsArr = secondItemsArr && secondItemsArr.map((secondItem, index) => {
            // 第二级item
            return {
                text: secondItem[`${Map[type].second}Name`],
                id: secondItem[`${Map[type].second}Id`],
            };
        });

        if (newSecondItemsArr) {
            newSecondItemsArr.unshift({
                text: '不限',
                id: -1,
            });
            itemFirst.itemArr = newSecondItemsArr;
        }

        return itemFirst;
    });

    if (firstItemsArr) {
        firstItemsArr.unshift({
            text: '不限',
            id: -1,
            isCanCancel: true,
        });

        positionDataArr.push({
            id: {
                type,
            },
            text: Map[type].text,
            itemArr: firstItemsArr,
        });
    }
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
                stuffDataToPosition(data.arr, data.type, positionDataArr);
            });

            return positionDataArr;

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
