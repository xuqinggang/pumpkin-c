// 对象state的键名字，与url字母缩写Map
let TypeAndPrefixMap = {
    districtId: 'a',
    circleId: 'b',
    subwayId: 'c',
    stationId: 'd',
    subways: 'c',
    direction: 'h',
    feature: 'j',
    area: 'k',
    floor: 'n',
    shared: 'f',
    whole: 'g'
};

TypeAndPrefixMap = Object.assign(TypeAndPrefixMap, reverseObjKeyValue(TypeAndPrefixMap));

// 位置筛选对应的字母数组
const TypeMapAlphaArr = {
    districts: [TypeAndPrefixMap.districtId, TypeAndPrefixMap.circleId],
    subways: [TypeAndPrefixMap.subwayId, TypeAndPrefixMap.stationId],
};

// 每个筛选条件内部的分隔符
const FILTER_ITEM_SEPARATOR = 'l';
// 各个筛选条件连接的分隔符
const FILTER_SEPARATOR = '-';


// 将state对象转换成筛选url参数
// stateObj { direction: { 1: true, 2: true }, floor: { 2: true, 3: true } }
// return f1l4-g3l5
export function stringifyTagsStateToUrl(stateObj) {
    if (!stateObj) {
        return '';
    }

    const rtUrlArr = [];
    Object.keys(stateObj).forEach((stateKey) => {
        let alpha = TypeAndPrefixMap[stateKey];
        let urlArr = [];
        const correspondState = stateObj[stateKey];

        Object.keys(correspondState).forEach((index) => {
            if (correspondState[index]) {
                urlArr.push(index);
            }
        });

        const urlJoinStr = urlArr.join(FILTER_ITEM_SEPARATOR);
        if (!urlJoinStr) {
            return '';
        }

        rtUrlArr.push(alpha + urlJoinStr);
    });

    return rtUrlArr.join(FILTER_SEPARATOR);
}

// tagUrlObj: { f:3l4, g3 }
export function parseTagsUrlToState(tagUrlObj) {
    let stateObj = {};

    tagUrlObj && Object.keys(tagUrlObj).forEach((alpha) => {
        if (!alpha) return;
        const valueStr = tagUrlObj[alpha];

        const correspondStateObj = {};
        const valueArr = valueStr.split(FILTER_ITEM_SEPARATOR);
        valueArr.forEach((value) => {
            correspondStateObj[value] = true;
        });

        stateObj[TypeAndPrefixMap[alpha]] = correspondStateObj;

    });

    return stateObj;
}

// rentValArr: [0-3300]
// return 'e0l3000'
export function stringifyRentStateToUrl(rentValArr) {
    if (rentValArr && rentValArr.length) {
        // [0, 20000] 代表无限，不拼接到url中
        if (rentValArr[0] === 0 && rentValArr[1] === 20000) return '';
        return 'e' + rentValArr.join('l')
    }

    return '';
}

// rentUrlObj: {e:1000l3000}
function parseRentUrlToState(rentUrlObj) {
    if (rentUrlObj && rentUrlObj.e) {
        const rentArr = rentUrlObj.e.split(FILTER_ITEM_SEPARATOR);
        return [parseInt(rentArr[0] ,10), parseInt(rentArr[1], 10)];
    }
}

//positionFilterState, eg: {firstItemSelectedIndex: 0, secondItemSelectedIndex: 1, thirdItemSelectedIndex: 2} 
export function stringifyPositionStateToUrl(positinFilterStateObj) {
    if (positinFilterStateObj &&
        (!Object.keys(positinFilterStateObj).length ||
            positinFilterStateObj.secondItemSelectedIndex === 0)
    ) return '';

    const {
        firstItemSelectedIndex,
        secondItemSelectedIndex,
        thirdItemSelectedIndex,
    } = positinFilterStateObj;

    // positionFilterDataObj: {districts: { 2345: {text: '2号线'}, sub: {} }}
    const positionFilterDataObj = window.getStore('positionFilterDataObj').data;

    const firstIndexMapType = {
        '0': 'districts',
        '1': 'subways',
    };

    // 获取第一级索引对应的类型对象
    const type = firstIndexMapType[firstItemSelectedIndex];
    const typePositionObj = positionFilterDataObj[type];

    // 获取第二级第三级索引对应的id
    let firstId, secondId;

    const firstIdArr = Object.keys(typePositionObj);
    firstId = firstIdArr[secondItemSelectedIndex];

    const secondIdArr = Object.keys(typePositionObj[firstId].sub);
    secondId = secondIdArr[thirdItemSelectedIndex];

    const urlArr = [];
    const alphaArr = TypeMapAlphaArr[type];
    if (firstId) {
        urlArr.push(`${alphaArr[0]}${firstId}`);
    }

    if (secondId != 0) {
        urlArr.push(`${alphaArr[1]}${secondId}`);
    }

    return urlArr.join(FILTER_SEPARATOR);
}

export function stringifyStateObjToUrl(filterStateObj) {
    const {
        position,
        rent,
        houseType,
        more
    } = filterStateObj;
    const urlArr = [];

    if (position) {
        const positionUrl = stringifyPositionStateToUrl(position);
        positionUrl && urlArr.push(positionUrl);
    }

    if (rent) {
        const rentUrl = stringifyRentStateToUrl(rent);
        rentUrl && urlArr.push(rentUrl);
    }

    if (houseType) {
        const houseTypeUrl = stringifyTagsStateToUrl(houseType);
        houseTypeUrl && urlArr.push(houseTypeUrl);
    }

    if (more) {
        const moreUrl = stringifyTagsStateToUrl(more);
        moreUrl && urlArr.push(moreUrl);
    }

    console.log('urlArr', urlArr);
    return urlArr.join(FILTER_SEPARATOR);
}

export function parseUrlToState(filterUrlFragment) {
    if (!filterUrlFragment) return;

    // 初始化的state
    const filterStateObj = {
        // rent: [0, 20000],
        // houseType: {},
        // more: {},
    };

    const filterUrlArr = filterUrlFragment.split(FILTER_SEPARATOR);

    // filterUrlObj: { e:3000l4000, f:4l1 }
    const filterUrlObj = {};
    filterUrlArr.forEach((filerUrlItem) => {
        if (!filerUrlItem) return;
        const alpha = filerUrlItem.substr(0, 1);
        const value = filerUrlItem.substr(1);
        filterUrlObj[alpha] = value;
    });

    const { a, b, c, d, e, ...tagUrlObj } = filterUrlObj;

    // 租金
    const rentState = parseRentUrlToState({e});
    rentState && Object.assign(filterStateObj, { rent: rentState });

    const tagsStateObj = parseTagsUrlToState(tagUrlObj);

    const {
        whole,
        shared,
        ...moreTagStateObj,
    } = tagsStateObj;

    // 房型
    const houseTypeStateObj = {};
    whole && Object.assign(houseTypeStateObj, { whole });
    shared && Object.assign(houseTypeStateObj, { shared });
    Object.assign(filterStateObj, { houseType: houseTypeStateObj });

    // 更多
    Object.assign(filterStateObj, { more: moreTagStateObj });

    console.log('filterStateObj', filterStateObj);
}

function parsePositionUrlToState(filterUrlFragment) {
    const ptStateObj = {};
    let districtId, subwayId;

    const positionFilterDataObj = window.getStore('positionFilterDataObj').data;
    if (!positionFilterDataObj) return null;

    const filterUrlArr = filterUrlFragment.split(FILTER_SEPARATOR);
    filterUrlArr.forEach((filterUrlItem) => {
        const alpha = filterUrlItem[0];
        const idVal = filterUrlItem.substr(1);

        // 区域
        if (alpha === 'a') {
            ptStateObj.firstItemSelectedIndex = 0;
            const districtIdArr = Object.keys(positionFilterDataObj.districts);
            districtId = idVal;
            ptStateObj.secondItemSelectedIndex = districtIdArr.indexOf(idVal);
            return;
        } 

        if (alpha === 'b') {
            const circlesObj = positionFilterDataObj.districts[districtId].sub;
            const circleIdArr = Object.keys(circlesObj);
            ptStateObj.thirdItemSelectedIndex = circleIdArr.indexOf(idVal);
            return;
        }

        // 地铁
        if (alpha === 'c') {
            ptStateObj.firstItemSelectedIndex = 1;
            const subwayIdArr = Object.keys(positionFilterDataObj).subways;
            subwayId = idVal;
            ptStateObj.secondItemSelectedIndex = subwayIdArr.indexOf(idVal);
            return;
        }

        if (alpha === 'd') {
            const stationsObj = positionFilterDataObj.subways[subwayId].sub;
            const stationIdArr = Object.keys(stationsObj);
            ptStateObj.thirdItemSelectedIndex = stationIdArr.indexOf(idVal);
            return;
        }
    });

    return ptStateObj;
}

// ptUrlObj: {a:123, b:21 } or {c:1234: d:1234}
function parsePositionUrlToParams(ptUrlObj) {
    const paramsObj = {};

    ptUrlObj && Object.keys(ptUrlObj).forEach((alpha) => {
        if (ptUrlObj[alpha]) {
            paramsObj[TypeAndPrefixMap[alpha]] = ptUrlObj[alpha];
        }
    });

    return paramsObj;
}
