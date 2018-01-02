import HouseTypeFilterTagData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';
import MoreFilterTagData from 'components/App/HouseList/MoreFilter/MoreFilterTagData';

// 页面进入的时候，如果含有filterUrlFragment, 则将url->state->params
// 将fliterState转换成params,此处排除position的转换，
// 返回的对象中，包含label和filterParams
export function filterStateToParams(filterState) {
    const {
        more,
        houseType,
        rent,
    } = filterState;

    const newFilterParams = {};
    const newLabel = {};
    if (more) {
        const { label, filterParams } = moreFilterStateToParams(more);
        Object.assign(newFilterParams, filterParams);
        newLabel.more = label;
    }

    if (rent) {
        const { label, filterParams } = rentFilterStateToParams(rent);
        Object.assign(newFilterParams, filterParams);
        newLabel.rent = label;
    }

    if (houseType) {
        const { label, filterParams } = houseTypeFilterStateToParams(houseType);
        Object.assign(newFilterParams, filterParams);
        newLabel.houseType = label;
    }

    return {
        label: newLabel,
        filterParams: newFilterParams,
    };
}

const  TagGroupTypeMapParamKey = {
    area: 'areaInfo',
    direction: 'directs',
    feature: 'tags',
    floor: 'floorInfo',
};
// moreFilterState, ex: { direction: {1:true, 2:false}, floor: {} }
// return { label:'更多', filterParams: { directs: ['NORTH'] } }
export function moreFilterStateToParams(moreFilterStateObj) {
    console.log('moreFilterState', moreFilterStateObj);

    // 总共选中的tag数量
    let totalCount = 0;

    const filterParams = {
        directs: null,
        tags: null,
        areaInfo: null,
        floorInfo: null,
    };
    
    let label = '更多';

    if (!moreFilterStateObj) {
        return {
            label,
            filterParams,
        };
    }

    // tagGroupName, eg: direction, floor, area, feature
    for(let tagGroupType in moreFilterStateObj) {
        const tagStateObj = moreFilterStateObj[tagGroupType];
        const paramKey = TagGroupTypeMapParamKey[tagGroupType];

        Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            if (isSelected) {
                totalCount++;

                const tagItem = MoreFilterTagData[`${tagGroupType}TagsArr`][tagIndex];
                // tagValue: 相应的tag value
                const tagValue = tagItem.value;
                label = tagItem.text;

                // 如果没有，初始化为数组
                if (!filterParams[paramKey]) {
                    filterParams[paramKey] = [tagValue];
                } else {
                    filterParams[paramKey].push(tagValue);
                }
            }
        });
    }

    if (totalCount > 1) {
        label = '多选';
    }

    return {
        label,
        filterParams,
    };
}

// 房型筛选，筛选栏选定的内容
const HouseTypeMapLabel = {
    UNLIMITED: '',
    ONE: '1居',
    TWO: '2居',
    THREE: '3居',
    TWO_MORE: '2居+',
    THREE_MORE: '3居+',
};
// houseTypeState, ex: { shared: {1:true, 2:false} }
// return { label:'合租二居', filterParams: { sharedRooms: ['TWO'] } }
export function houseTypeFilterStateToParams(houseTypeFilterStateObj) {
    // 总共选中的tag数量
    let totalCount = 0;

    const filterParams = {
        sharedRooms: null,
        wholeRooms: null,
    };
    let label = '房型';

    if (!houseTypeFilterStateObj) {
        return {
            filterParams,
            label,
        };
    }

    for(let tagGroupType in houseTypeFilterStateObj) {
        const tagStateObj = houseTypeFilterStateObj[tagGroupType];
        const paramKey = `${tagGroupType}Rooms`;
        // 临时存储tag text
        let tmpValue = null;

        Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            if (isSelected) {
                totalCount++;

                const tagItem = HouseTypeFilterTagData[`${tagGroupType}TagsArr`][tagIndex];
                const tagValue = tagItem.value;
                tmpValue = tagItem.value;

                // 如果没有，初始化为数组
                if (!filterParams[paramKey]) {
                    filterParams[paramKey] = [tagValue];
                } else {
                    filterParams[paramKey].push(tagValue);
                }
            }
        });

        if (totalCount === 1) {
            label = (
                tagGroupType == 'shared' ? '合租' : '整租'
            ) + HouseTypeMapLabel[tmpValue];
        }
    }

    if (totalCount > 1) {
        label = '多选';
    }

    return {
        label,
        filterParams,
    };
}

// rentState, ex: [0-3000]
export function rentFilterStateToParams(rentState) {
    const filterParams = {
        priceInfo: null, 
    };
    let label = '租金';

    if (!rentState) {
        return {
            filterParams,
            label,
        };
    }

    // 20000标志着不限
    if (rentState) {
        if (rentState[1] == 20000) {
            filterParams.priceInfo = { floor: rentState[0] }
            label = `${rentState[0]}以上`;
        } else {
            filterParams.priceInfo = { floor: rentState[0], ceil: rentState[1] };
            label = `${rentState[0]}-${rentState[1]}`;
        }
    }
    return {
        label,
        filterParams,
    };
}

// 位置类型对应接口参数key
const PtTypeMapParamsKey = {
    districts: ['districtId', 'circleId'],
    subways: ['subwayId', 'stationId'],
    around: ['nearByInfo'],
};
export function positionFilterStateToParams(positinFilterStateObj) {
    console.log('positionFilterStateToParams', positinFilterStateObj);
    const filterParams = {
        districtId: null,
        circleId: null,
        subwayId: null,
        stationId: null,
        nearByInfo: null,
    };
    let label = '位置';
    const positionFilterDataArr = window.getStore('positionFilterDataArr').data;

    if (!positinFilterStateObj || !positionFilterDataArr) {
        return {
            label,
            filterParams,
        };
    }

    let positionType = '';

    // 位置筛选的区域，地铁数据 [{ around: { text: '区域', itemArr: [] } }]

    const {
        firstItemSelectedIndex,
        secondItemSelectedIndex,
        thirdItemSelectedIndex,
    } = positinFilterStateObj;

    let thirdItem = null;

    const firstItem = positionFilterDataArr[firstItemSelectedIndex];
    const secondItem = firstItem.itemArr[secondItemSelectedIndex];

    // ex: 'districts', 'subways'
    positionType = firstItem.id.type;
    const correspondParamsKeyArr = PtTypeMapParamsKey[positionType];


    if (secondItemSelectedIndex != undefined && secondItemSelectedIndex !== -1) {
        if (secondItem.id != -1) {
            label = secondItem.text;
            filterParams[correspondParamsKeyArr[0]] = secondItem.id;
        }
    }

    if (thirdItemSelectedIndex != undefined && thirdItemSelectedIndex !== -1) {
        thirdItem = secondItem.itemArr[thirdItemSelectedIndex];
        if (thirdItem.id != -1) {
            label = thirdItem.text;
            filterParams[correspondParamsKeyArr[1]] = thirdItem.id;
        }
    }

    return {
        label,
        filterParams,
    };
}
