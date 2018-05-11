import Service from 'lib/Service';

const TypeMapItem = {
    apartments: {
        info: {
            type: 'apartments',
            text: '',
            field: 'apartmentId',
            fieldValue: '',
        },
    },
    districts: {
        iconClass: 'icon-region',
        info: {
            type: 'districts',
            text: '',
            field: 'districtId',
            fieldValue: '',
        },
    },
    circles: {
        iconClass: 'icon-trade-area',
        subName: ['districtName'],
        info: {
            type: 'circles',
            text: '',
            field: 'circleId',
            fieldValue: '',
            superField: 'districtId',
            superFieldValue: '',
        },
    },
    subways: {
        iconClass: 'icon-subway2',
        info: {
            type: 'subways',
            text: '',
            field: 'subwayId',
            fieldValue: '',
        },
    },
    stations: {
        iconClass: 'icon-subway2',
        subName: ['subwayName'],
        info: {
            type: 'stations',
            text: '',
            field: 'stationId',
            fieldValue: '',
            superField: 'subwayId',
            superFieldValue: '',
        },
    },
    blocks: {
        subName: ['districtName', 'circleName'],
        iconClass: 'icon-village',
        info: {
            type: 'blocks',
            text: '',
            field: 'blockId',
            fieldValue: '',
        },
    },
    addresses: {
        iconClass: 'icon-address',
        subName: ['districtName', 'circleName'],
        info: {
            type: 'addresses',
            text: '',
            field: 'blockId',
            fieldValue: '',
        },
    },
};

// 热门搜索
export function ajaxTopSearches() {
    return Service.get('/api/v1/rentUnits/topSearches');
}

// 关键字搜索
export function ajaxSearchHits(params = {}) {
    return Service.get('/api/v1/rentUnits/searchHits', params)
        .then((data) => {
            if (data.code === 200) {
                const searchHitObj = data.data;
                const newSearchHitObj = {};
                searchHitObj && Object.keys(searchHitObj).forEach((type) => {
                    const typeSearchHitArr = searchHitObj[type];
                    let newTypeSearchHitArr = null;

                    newTypeSearchHitArr = !(typeSearchHitArr && typeSearchHitArr.length) ?
                        [] :
                        typeSearchHitArr.map((typeSearchHitItem) => {
                            const {
                                id,
                                name,
                                count,
                                image,
                            } = typeSearchHitItem;
                            const newTypeSearchHitItem = {
                                text: name,
                                fieldValue: id,
                                count,
                                image,
                                iconClass: TypeMapItem[type].iconClass,
                            };
                            const typeItem = TypeMapItem[type];

                            // superField
                            // 对应类型的superField: (subwayId or districtId)
                            const superField = typeItem.info.superField;
                            if (superField) {
                                const superFieldValue = typeSearchHitItem[superField];
                                newTypeSearchHitItem.superFieldValue = superFieldValue;
                            }

                            // 拼接subName
                            const subNameArr = typeItem && typeItem.subName;
                            if (subNameArr) {
                                let subName = '';
                                subNameArr && subNameArr.forEach((item) => {
                                    const tmpSubName = typeSearchHitItem[item];
                                    if (tmpSubName) {
                                        subName += `${tmpSubName} `;
                                    }
                                });
                                newTypeSearchHitItem.subName = subName;
                            }

                            return Object.assign({}, typeItem.info, newTypeSearchHitItem);
                        });

                    newSearchHitObj[type] = newTypeSearchHitArr;
                });

                // 将subways和stations合并，然后删除stations
                newSearchHitObj.subways = newSearchHitObj.subways.concat(newSearchHitObj.stations);
                delete newSearchHitObj.stations;
                return newSearchHitObj;
            }

            throw new Error(data);
        });
}
