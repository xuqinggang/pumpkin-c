import Service from 'lib/Service';

const TypeMapSubName = {
    apartments: {},
    districts: {
        iconClass: 'icon-region',
    },
    subways: {
        iconClass: 'icon-subway2',
    },
    stations: {
        iconClass: 'icon-subway2',
        subName: ['subwayName'],
        superId: 'subwayId',
    },
    circles: {
        iconClass: 'icon-trade-area',
        subName: ['districtName'],
        superId: 'districtId',
    },
    blocks: {
        subName: ['districtName', 'circleName'],
        iconClass: 'icon-village',
    },
    addresses: {
        iconClass: 'icon-address',
        subName: ['districtName', 'circleName'],
    },
};

// 关键字搜索
export function ajaxSearchHits(params = {}) {
    return Service.get('/api/v1/rentUnits/searchHits', params)
        .then((data) => {
            if (data.code === 200) {
                const searchData = data.data;
                // 对数据进行处理
                const newSeachData = {};
                searchData && Object.keys(searchData).forEach((type) => {
                    const typeSearchDataArr = searchData[type];
                    let newTypeSearchDataArr = null;

                    newTypeSearchDataArr = !(typeSearchDataArr && typeSearchDataArr.length) ?
                        [] :
                        typeSearchDataArr.map((typeSearchDataItem) => {
                            const {
                                id,
                                name,
                                count,
                                image,
                            } = typeSearchDataItem;

                            const newTypeSearchDataItem = {
                                id,
                                name,
                                count,
                            };

                            // 如果是公寓则icon是图片,其余是字体icon
                            if (type === 'apartments') {
                                newTypeSearchDataItem.image = image;
                            } else {
                                newTypeSearchDataItem.iconClass = TypeMapSubName[type].iconClass;
                            }

                            const subInfo = TypeMapSubName[type];
                            // superId
                            // 对应类型的superId: (subwayId or districtId)
                            const typeSuperIdKey = subInfo.superId;
                            const typeSuperIdVal = typeSearchDataItem[typeSuperIdKey];

                            // 拼接subName
                            const typeSubNameArr = subInfo && subInfo.subName;
                            let subName = '';
                            typeSubNameArr && typeSubNameArr.forEach((item) => {
                                const tmpSubName = typeSearchDataItem[item];
                                if (tmpSubName) {
                                    subName += `${tmpSubName} `;
                                }
                            });

                            newTypeSearchDataItem.subName = subName;
                            newTypeSearchDataItem.superId = typeSuperIdVal;

                            return newTypeSearchDataItem;
                        });

                    newSeachData[type] = newTypeSearchDataArr;
                });

                // 将subways和stations合并，然后删除stations
                newSeachData.subways = newSeachData.subways.concat(newSeachData.stations);
                delete newSeachData.stations;
                console.log(newSeachData, 'newSeachData');
                return newSeachData;
            }

            throw new Error(data);
        });
}

// 热门搜索
export function ajaxTopSearches(params) {
    return Service.get('/api/v1/rentUnits/topSearches', params)
        .then((data) => {
            if (data.code === 200) {
                const oldTopSearches = data.data.topSearches;
                const newTopSearches = oldTopSearches.map((item) => {
                    const {
                        type,
                    } = item;

                    return {
                        ...item,
                        type: `${type.toLowerCase()}s`,
                    };
                });

                return {
                    topSearches: newTopSearches,
                };
            }

            throw new Error(data);
        });
}
