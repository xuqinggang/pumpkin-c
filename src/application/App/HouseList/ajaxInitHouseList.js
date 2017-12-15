import Service from 'lib/Service';

const Map = {
    districts: {
        first: 'district',
        second: 'circle',
        text: '区域'
    },
    subways: {
        first: 'subway',
        second: 'station',
        text: '地铁',
    },
};


function stuffDataToPosition(itemArr, type, positionData) {
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
        if (!positionData[type]) {
            positionData[type] = {};
            firstItemsArr.unshift({
                text: '不限',
                id: -1,
            });

            positionData[type].itemArr = firstItemsArr;
            positionData[type].text = Map[type].text;
        }
    }
}

export function ajaxInitPositionData(cityId = 1) {
    // 位置筛选的数据
    let positionData = {};

    return Promise.all([
        _ajaxDistricts(cityId),
        _ajaxSubways(cityId),
    ])
        .then((datas) => {
            datas.forEach((data) => {
                stuffDataToPosition(data.arr, data.type, positionData);
            });
            
            // 手动添加附近相关数据
            positionData.around = {
                text: '附近',
                itemArr: [
                    {
                        text: '附近',
                    },
                    {
                        text: '1km',
                        distance: 1,
                    },
                    {
                        text: '2km',
                        distance: 2,
                    },
                    {
                        text: '3km',
                        distance: 3,
                    },
                ],
            };

            return positionData;
        })
        .catch((err) => {
            console.log('ajaxInitPositionData err:', err);
        })
}

function _ajaxDistricts(cityId) {
    return Service.get(`/api/v1/common/districts?cityId=${cityId}`)
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

function _ajaxSubways(cityId) {
    return Service.get(`/api/v1/common/subways?cityId=${cityId}`)
        .then((data) => {
            if (data.code == 200) {
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
