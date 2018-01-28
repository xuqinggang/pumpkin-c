// 对象state的键名字，与url字母缩写Map
let TypeAndPrefixMap = {
    direction: 'd',
    feature: 'b',
    area: 'a',
    floor: 'f',
    shared: 's',
    whole: 'w'
};

// const SEPARATOR = 'I';

// 反转对象的属性和值
function reverseObjKeyValue(obj) {
    const reverseObj = {};
    for(let key in obj) {
        reverseObj[obj[key]] = key;
    }

    return reverseObj;
}

TypeAndPrefixMap = Object.assign(TypeAndPrefixMap, reverseObjKeyValue(TypeAndPrefixMap));

// 将state对象转换成筛选url参数
// ex: { direction: { 1: true, 2: true }, floor: { 2: true, 3: true } } to 'd1|2f2|3'
export function stringifyTagsStateToUrl(stateObj) {
    if (!stateObj) {
        return '';
    }

    const urlArr = Object.keys(stateObj).map((stateName) => {
        let urlPrefix = TypeAndPrefixMap[stateName];
        let urlArr = [];
        const correspondState = stateObj[stateName];

        Object.keys(correspondState).forEach((index) => {
            if (correspondState[index]) {
                urlArr.push(index);
            }
        });

        const urlJoinStr = urlArr.join('|');
        if (!urlJoinStr) {
            return '';
        }

        return urlPrefix + urlJoinStr;
    });

    return urlArr.join('');
}

export function parseTagsUrlToState(filterUrl) {
    let stateObj = {};
    if (!filterUrl) { return null; }
    const regRtArr = filterUrl.match(/(\w[\d\|]*)/g);
    regRtArr.forEach((regRtItem) => {
        // regRtItem,ex: d1|2
        if (regRtItem) {
            // 前缀,ex:d
            const prefix = regRtItem[0];
            // ex: {1:true, 2:true}
            const correspondStateObj  = {};

            // ex:1|2
            const leftStr = regRtItem.substr(1);
            const valueArr = leftStr.split('|');
            valueArr.forEach((value) => {
                correspondStateObj[value] = true;
            });
            // { direction: {1:true} }
            stateObj[TypeAndPrefixMap[prefix]] = correspondStateObj;
        }
    });
    return stateObj;
}

// rentValArr: [0-3300]
// return 'p0-3300'
export function stringifyRentStateToUrl(rentValArr) {
    if (rentValArr && rentValArr.length) {
        return 'p' + rentValArr.join('-')
    }

    return '';
}

// rentUrl: 'p4000-6000'
// return: [4000-6000]
export function parseRentUrlToState(rentUrl) {
    if (rentUrl) {
        const rentArr = rentUrl.substr(1).split('-');
        return [parseInt(rentArr[0] ,10), parseInt(rentArr[1], 10)]
    }
}

//positionFilterState, eg: {firstItemSelectedIndex: 0, secondItemSelectedIndex: 1, thirdItemSelectedIndex: 2} 
export function stringifyPositionStateToUrl(positinFilterStateObj) {
    const {
        firstItemSelectedIndex,
        secondItemSelectedIndex,
        thirdItemSelectedIndex,
    } = positinFilterStateObj;
    
    // 位置筛选的区域，地铁数据 [{ around: { text: '区域', itemArr: [] } }]
    const positionFilterDataArr = window.getStore('positionFilterDataArr').data;
    let positionUrlArr = [];

    const firstItem = positionFilterDataArr[firstItemSelectedIndex];
    // eg: 'districts', 'subways'
    const positionType = firstItem.id.type;

    if (positionType === 'around') { return; }

    let secondItem = null;
    if (secondItemSelectedIndex != undefined && secondItemSelectedIndex != -1) {
        secondItem = firstItem.itemArr[secondItemSelectedIndex];

        positionUrlArr.push(positionType);
        const secondItemId = secondItem.id;
        if (secondItemId === -1) {
            positionUrlArr.push(secondItemSelectedIndex);
        } else {
            positionUrlArr.push(`${secondItemSelectedIndex}-${secondItemId}`);
        }
    }

    if (thirdItemSelectedIndex != undefined && thirdItemSelectedIndex != -1 && secondItem) {
        const thirdItem = secondItem.itemArr[thirdItemSelectedIndex];
        const thirdItemId = thirdItem.id;
        if (thirdItemId === -1) {
            positionUrlArr.push(thirdItemSelectedIndex);
        } else {
            positionUrlArr.push(`${thirdItemSelectedIndex}-${thirdItemId}`);
        }
    }
        
    return positionUrlArr.join('|');
}

// 位置类型对应接口参数key
const PtTypeMapParamsKey = {
    districts: ['districtId', 'circleId'],
    subways: ['subwayId', 'stationId'],
    around: ['nearByInfo'],
};

// 位置比较特殊，根据url生成state和params信息
// 转换positionUrl->positionState和positionParams
export function parsePositionUrlToState(positionUrl) {
    if (!positionUrl) return ;
    const positionState = {
        firstItemSelectedIndex: 0,
        secondItemSelectedIndex: -1,
        thirdItemSelectedIndex: -1,
    };
    const positionParams = {};
    let positionParamsKey = null;

    const TypeMapIndex = {
        districts: 0,
        subways: 1,
    };

    const positionUrlArr = positionUrl.split('|');
    if (positionUrlArr[0]) {
        positionState.firstItemSelectedIndex = TypeMapIndex[positionUrlArr[0]];
        positionParamsKey = PtTypeMapParamsKey[positionUrlArr[0]];
    }

    if (positionUrlArr[1]) {
        const indexAndIdArr = positionUrlArr[1].split('-');
        positionState.secondItemSelectedIndex = parseInt(indexAndIdArr[0], 10);

        // id
        if (indexAndIdArr[1] && positionParamsKey) {
            positionParams[positionParamsKey[0]] = indexAndIdArr[1];
        }
    }

    if (positionUrlArr[2]) {
        const indexAndIdArr = positionUrlArr[2].split('-');
        positionState.thirdItemSelectedIndex = parseInt(indexAndIdArr[0], 10);

        // id
        if (indexAndIdArr[1] && positionParamsKey) {
            positionParams[positionParamsKey[1]] = indexAndIdArr[1];
        }
    }

    return {
        state: positionState,
        params: positionParams,
    };
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

    if (more) {
        const moreUrl = stringifyTagsStateToUrl(more);
        moreUrl && urlArr.push(moreUrl);
    }

    if (houseType) {
        const houseTypeUrl = stringifyTagsStateToUrl(houseType);
        houseTypeUrl && urlArr.push(houseTypeUrl);
    }

    return urlArr.join('~');
}

export function parseUrlToState(filterUrlFragment) {
    // 初始化的state
    const filterStateObj = {
        rent: [],
        position: {},
        houseType: {},
        more: {},
    };

    if (filterUrlFragment) {
        const filterUrlArr = filterUrlFragment.split('~');
        filterUrlArr.forEach((filerUrlItem) => {
            // 如果url第一个字母p,则为租金筛选
            if (filerUrlItem[0] === 'p') {
                filterStateObj.rent = parseRentUrlToState(filerUrlItem);
                return;
            }

            // 如果url中含有'subways'和'districts'字段，则position筛选
            if (filerUrlItem.indexOf('subways') != -1 || filerUrlItem.indexOf('districts') != -1) {
                filterStateObj.position = parsePositionUrlToState(filerUrlItem);
                return;
            }

            if (filerUrlItem.indexOf('s') !=-1 || filerUrlItem.indexOf('w') != -1) {
                filterStateObj.houseType = parseTagsUrlToState(filerUrlItem);
                return;
            }

            filterStateObj.more = parseTagsUrlToState(filerUrlItem);

        });
        return filterStateObj;
    }

    return filterStateObj;
}
