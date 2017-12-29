import HouseDetailMap from 'application/App/HouseDetail/HouseDetailMap';
import HouseTypeFilterTagData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';
import MoreFilterTagData from 'components/App/HouseList/MoreFilter/MoreFilterTagData';

// 房型筛选，筛选栏选定的内容
const HouseTypeMapLabel = {
    UNLIMITED: '',
    ONE: '1居',
    TWO: '2居',
    THREE: '3居',
    TWO_MORE: '2居+',
    THREE_MORE: '3居+',
};

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

// moreFilterState, ex: { direction: {1:true, 2:false}, floor: {} }
// return { label:'更多', filterParams: { directs: ['NORTH'] } }
export function moreFilterStateToParams(moreFilterState) {
    console.log('moreFilterState', moreFilterState);
    // moreFilterObj, ex: { area: [{floor: 20, ceil: 40}], floor: [], feature: ['AVAILABLE']... }
    const moreFilterObj = moreFilterGenData(moreFilterState);

    return moreFilterDataToParams(moreFilterObj);
}

// houseTypeState, ex: { shared: {1:true, 2:false} }
// return { label:'合租二居', filterParams: { sharedRooms: ['TWO'] } }
export function houseTypeFilterStateToParams(houseTypeState) {
    // houseTypeFilterObj, ex: { shared: ['ONE'] }
    const houseTypeFilterObj = houseTypeFilterGenData(houseTypeState);

    return houseTypeFilterDataToParams(houseTypeFilterObj);
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
    };
    let label = '位置';

    if (!positinFilterStateObj) {
        return {
            label,
            filterParams,
        };
    }

    let positionType = '';

    // 位置筛选的区域，地铁数据 [{ around: { text: '区域', itemArr: [] } }]
    const positionFilterDataArr = window.getStore('positionFilterDataArr').data;

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

function moreFilterDataToParams(moreFilterObj) {
    let label = '更多';
    const filterParams = {
        directs: null,
        tags: null,
        areaInfo: null,
        floorInfo: null,
    };

    // 如果筛选被清空，返回空对象
    if (!moreFilterObj) {
        return {
            label,
            filterParams,
        };
    }

    let totalCount = 0;
    const  keyMapParamKey = {
        area: 'areaInfo',
        direction: 'directs',
        feature: 'tags',
        floor: 'floorInfo',
    };

    Object.keys(moreFilterObj).forEach((key) => {
        const moreValArr = moreFilterObj[key];
        const paramKey = keyMapParamKey[key];
        totalCount += moreValArr.length;

        if (!moreValArr.length) {
            return ;
        }

        if (moreValArr.length === 1) {
            label = HouseDetailMap[moreValArr[0]];
        }

        filterParams[paramKey] = moreValArr;
    });

    if (totalCount > 1) {
        label = '多选';
    }

    return {
        label,
        filterParams,
    };
}

// houseTypeFilterObj, ex: { shared: ['ONE', ..], whole: [] }
function houseTypeFilterDataToParams(houseTypeFilterObj) {
    const filterParams = {
        sharedRooms: null,
        wholeRooms: null,
    };
    let label = '房型';

    if (!houseTypeFilterObj) {
        return {
            filterParams,
            label,
        };
    }

    // 统计选中的总数，如果大于1，则label为多选
    let totalCount = 0;

    Object.keys(houseTypeFilterObj).forEach((houseType) => {
        const houseTypeValArr = houseTypeFilterObj[houseType];
        totalCount += houseTypeValArr.length;
        if (!houseTypeValArr.length) {
            return;
        }

        if (houseTypeValArr.length === 1) {
            label = (
                houseType == 'shared' ? '合租' : '整租'
            ) + HouseTypeMapLabel[houseTypeValArr[0]];
        }

        filterParams[`${houseType}Rooms`] = houseTypeValArr;
    });

    if (totalCount > 1) {
        label = '多选';
    }

    return {
        label,
        filterParams,
    };
}

// moreFilterStateObj: state数据, ex: { direction: { 0: false, 1: true }, area: { 3: true } }
function moreFilterGenData(moreFilterStateObj) {
    if (!moreFilterStateObj) return;
    // 转换后的请求参数数据
    const moreFilterDataObj = {
        direction: [],
        area: [],
        floor: [],
        feature: [],
    };

    for(let tagGroupName in moreFilterStateObj) {
        const tagStateObj = moreFilterStateObj[tagGroupName];

        Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            if (isSelected) {
                // tagsInfoObj[`${type}TagsArr`] 拼接拿到相应的tags
                const tagValue = MoreFilterTagData[`${tagGroupName}TagsArr`][tagIndex].value;
                moreFilterDataObj[tagGroupName].push(tagValue);
            }
        });
    }

    return moreFilterDataObj;
}

// houseFilterStateObj: state数据, ex: { shared: { 0: false, 1: true }, whole: { 3: true } }
// return houseTypeFilterDataObj, ex: { shared: ['TWO'], whole: ['THREE'] }
function houseTypeFilterGenData(houseFilterStateObj) {
    if (!houseFilterStateObj) return;

    // 转换后的请求参数数据
    const houseTypeFilterDataObj = {
        shared: [],
        whole: [],
    };

    for(let tagGroupName in houseFilterStateObj) {
        const tagStateObj = houseFilterStateObj[tagGroupName];
        Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            if (isSelected) {
                // 获取tag索引，对应的值
                const tagValue = HouseTypeFilterTagData[`${tagGroupName}TagsArr`][tagIndex].value;
                houseTypeFilterDataObj[tagGroupName].push(tagValue);
            }
        });
    }

    return houseTypeFilterDataObj;
}
