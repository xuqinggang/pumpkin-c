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
        position,
    } = filterState;

    // 初始值
    const newFilterParams = {};
    const newLabel = {};
    // seoData用于服务器端渲染时，生成meta标签相关数据
    const newSeoData = {};

    const { label: moreLabel, filterParams: moreFilterParams, seoData: moreSeoData } = moreFilterStateToParams(more);
    Object.assign(newFilterParams, moreFilterParams);
    Object.assign(newSeoData, { more: moreSeoData });
    newLabel.more = moreLabel;

    const { label: rentLabel, filterParams: rentFilterParams, seoData: rentSeoData } = rentFilterStateToParams(rent);
    Object.assign(newFilterParams, rentFilterParams);
    Object.assign(newSeoData, { rent: rentSeoData });
    newLabel.rent = rentLabel;

    const { label: houseTypeLabel, filterParams: houseTypeFilterParams, seoData: houseTypeSeoData }
        = houseTypeFilterStateToParams(houseType);
    Object.assign(newFilterParams, houseTypeFilterParams);
    Object.assign(newSeoData, { houseType: houseTypeSeoData });
    newLabel.houseType = houseTypeLabel;

    const { label: positionLabel, filterParams: positionFilterParams, seoData: positionSeoData }
        = positionFilterStateToParams(position);
    Object.assign(newFilterParams, positionFilterParams);
    Object.assign(newSeoData, { position: positionSeoData });
    newLabel.position = positionLabel;

    return {
        label: newLabel,
        seoData: newSeoData,
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
    // 总共选中的tag数量
    let totalCount = 0;

    const filterParams = {
        directs: null,
        tags: null,
        areaInfo: null,
        floorInfo: null,
    };

    const seoData = {};
    
    let label = '更多';

    if (!moreFilterStateObj) {
        return {
            label,
            filterParams,
            seoData,
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
                    seoData[paramKey] = [label]
                    filterParams[paramKey] = [tagValue];
                } else {
                    seoData[paramKey].push(label);
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
        seoData,
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

    const seoData = {};
    const filterParams = {
        sharedRooms: null,
        wholeRooms: null,
    };
    let label = '房型';

    if (!houseTypeFilterStateObj) {
        return {
            filterParams,
            label,
            seoData,
        };
    }

    for(let tagGroupType in houseTypeFilterStateObj) {
        const tagStateObj = houseTypeFilterStateObj[tagGroupType];
        const paramKey = `${tagGroupType}Rooms`;

        Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            if (isSelected) {
                totalCount++;

                const tagItem = HouseTypeFilterTagData[`${tagGroupType}TagsArr`][tagIndex];
                const tagValue = tagItem.value;
                const tagText = HouseTypeMapLabel[tagValue];

                // 如果没有，初始化为数组
                if (!filterParams[paramKey]) {
                    seoData[paramKey] = [tagText];
                    filterParams[paramKey] = [tagValue];
                } else {
                    seoData[paramKey].push(tagText);
                    filterParams[paramKey].push(tagValue);
                }

                if (totalCount === 1) {
                    label = (
                        tagGroupType == 'shared' ? '合租' : '整租'
                    ) + tagText;
                }
            }
        });

    }

    if (totalCount > 1) {
        label = '多选';
    }

    return {
        label,
        seoData,
        filterParams,
    };
}

// rentState, ex: [0-3000]
export function rentFilterStateToParams(rentState) {
    const seoData = '';
    const filterParams = {
        priceInfo: null, 
    };
    let label = '租金';

    if (!rentState) {
        return {
            label,
            seoData,
            filterParams,
        };
    }

    // 20000标志着不限
    if (rentState.length) {
        if (rentState[1] == 20000) {
            filterParams.priceInfo = { floor: rentState[0], ceil: null };
            if (rentState[0] === 0) {
                label = '租金';
            } else {
                label = `${rentState[0]}以上`;
            }
        } else if (rentState[0] === 0) {
            filterParams.priceInfo = { floor: null, ceil: rentState[1] };
            label = `${rentState[1]}以下`;
        } else {
            filterParams.priceInfo = { floor: rentState[0], ceil: rentState[1] };
            label = `${rentState[0]}-${rentState[1]}`;
        }
    }

    return {
        label,
        seoData: label === '租金' ? '' : label,
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
    console.log(positinFilterStateObj, 'positinFilterStateObj');
    const seoData = [];
    const filterParams = {
        districtId: null,
        circleId: null,
        subwayId: null,
        stationId: null,
        nearByInfo: null,
    };
    let label = '位置';
    const positionStore = window.getStore('positionFilterDataArr');
    const positionFilterDataArr = positionStore && positionStore.data;

    if (!positinFilterStateObj || !positionFilterDataArr || !Object.keys(positinFilterStateObj).length) {
        return {
            label,
            filterParams,
            seoData,
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
            seoData.push(label);
            filterParams[correspondParamsKeyArr[0]] = parseInt(secondItem.id, 10);
        }
    }

    if (thirdItemSelectedIndex != undefined && thirdItemSelectedIndex !== -1) {
        thirdItem = secondItem.itemArr[thirdItemSelectedIndex];
        if (thirdItem.id != -1) {
            label = thirdItem.text;
            seoData.push(label);
            filterParams[correspondParamsKeyArr[1]] = parseInt(thirdItem.id, 10);
        }
    }

    return {
        label,
        seoData,
        filterParams,
    };
}
