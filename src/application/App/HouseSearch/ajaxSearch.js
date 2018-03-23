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
        subName: 'subwayName',
    },
    circles: {
        subName: ['districtName'],
        iconClass: 'icon-trade-area',
    },
    blocks: {
        subName: ['districtName', 'circleName'],
        iconClass: 'icon-village',
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

                            // 拼接subName
                            const typeSubNameArr = TypeMapSubName[type] && TypeMapSubName[type].subName;
                            let subName = '';
                            typeSubNameArr && typeSubNameArr.forEach((item) => {
                                const tmpSubName = typeSearchDataItem[item];
                                if (tmpSubName) {
                                    subName += `${tmpSubName} `;
                                }
                            });
                            newTypeSearchDataItem.subName = subName;

                            return newTypeSearchDataItem;
                        });

                    newSeachData[type] = newTypeSearchDataArr;
                });

                // 将subways和stations合并，然后删除stations
                newSeachData.subways.concat(newSeachData.stations);
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
                return data.data;
            }

            throw new Error(data);
        });
}
