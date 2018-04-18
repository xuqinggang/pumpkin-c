/* @flow */
// 转换state->url(url改变), params(请求参数), label(筛选器label)

import HouseTypeFilterTagData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';
import MoreFilterTagData from 'components/App/HouseList/MoreFilter/MoreFilterTagData';
import { reverseObjKeyValue } from 'lib/util';
import { InitStateFilterLabel, InitStateFilterState } from './initState';

// const
// 筛选参数键，与url字母缩写Map
export let TypeAndPrefixMap = {
    districtId: 'a',
    circleId: 'b',
    subwayId: 'c',
    stationId: 'd',
    directs: 'h',
    tags: 'j',
    areaInfo: 'k',
    floorInfo: 'n',
    sharedRooms: 'f',
    wholeRooms: 'g',
    priceInfo: 'e',
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
export const FILTER_SEPARATOR = '-';

// trans state->url,label,paramsObj
// positionState, eg:
// {firstItemSelectedIndex: 0, secondItemSelectedIndex: 1, thirdItemSelectedIndex: 2}
export function stringifyPostionState(positionState) {
    let url = '',
        label = InitStateFilterLabel.position;
    const paramsObj = {
        districtId: null,
        circleId: null,
        subwayId: null,
        stationId: null,
    };
    const seoData = [];

    const positionDataStore = window.getStore('positionFilterDataObj').data;
    if (!positionDataStore) return { url, paramsObj, label, seoData };

    const {
        firstItemSelectedIndex,
        secondItemSelectedIndex,
        thirdItemSelectedIndex,
    } = positionState;

    const firstIndexMapType = {
        '0': 'districts',
        '1': 'subways',
        '2': 'around',
    };

    // 获取第一级索引对应的类型对象
    const type = firstIndexMapType[firstItemSelectedIndex];
    const typePositionObj = positionDataStore[type];

    // 获取第二级第三级索引对应的id
    // firstId, secondId;

    const firstIdArr = Object.keys(typePositionObj),
        firstId = firstIdArr[secondItemSelectedIndex];

    const secondObj = typePositionObj[firstId].sub || {},
        secondIdArr = Object.keys(secondObj),
        secondId = secondIdArr[thirdItemSelectedIndex];

    const urlArr = [];
    const alphaArr = TypeMapAlphaArr[type];

    if (parseInt(firstId, 10) !== 0) {
        const firstParamKey = TypeAndPrefixMap[alphaArr[0]];
        paramsObj[firstParamKey] = parseInt(firstId, 10);
        label = typePositionObj[firstId].text;
        urlArr.push(`${alphaArr[0]}${firstId}`);
        seoData.push(label);

        if (parseInt(secondId, 10) !== 0) {
            const secondParamKey = TypeAndPrefixMap[alphaArr[1]];
            paramsObj[secondParamKey] = parseInt(secondId, 10);
            label = secondObj[secondId];
            urlArr.push(`${alphaArr[1]}${secondId}`);
            seoData.push(label);
        }
    }

    url = urlArr.join(FILTER_SEPARATOR);
    return {
        url,
        paramsObj,
        label,
        seoData,
    };
}

// trans rentState -> url,params,label
// rentState: [3000-4999]
export function stringifyRentState(rentState) {
    let url = '',
        label = InitStateFilterLabel.rent;
    const paramsObj = {
        priceInfo: null,
    };
    const seoData = '';

    if (rentState && rentState.length) {
        // [0, 20000] 代表无限，不拼接到url中
        if (!(rentState[0] === 0 && rentState[1] === 20000)) {
            const prefix = TypeAndPrefixMap.priceInfo;
            url = prefix + rentState.join(FILTER_ITEM_SEPARATOR);

            if (rentState[0] === 0) {
                label = `${rentState[1]}以下`;
                paramsObj.priceInfo = { floor: rentState[0], ceil: null };
            } else if (rentState[1] === 20000) {
                label = `${rentState[0]}以上`;
                paramsObj.priceInfo = { floor: null, ceil: rentState[1] };
            } else {
                label = `${rentState[0]}-${rentState[1]}`;
                paramsObj.priceInfo = { floor: rentState[0], ceil: rentState[1] };
            }
        }
    }

    return {
        url,
        paramsObj,
        label,
        seoData: label === InitStateFilterLabel.rent ? '' : label,
    };
}

// trans rentUrl->state,labl,params
// rentUrlObj: {e:1000l3000}
function parseRentUrl(rentUrlObj) {
    const prefix = TypeAndPrefixMap.priceInfo;
    const tmpRentValArr = rentUrlObj[prefix].split(FILTER_ITEM_SEPARATOR);
    const rentValArr = [parseInt(tmpRentValArr[0], 10), parseInt(tmpRentValArr[1], 10)];
    const {
        url,
        paramsObj,
        label,
        seoData,
    } = stringifyRentState(rentValArr);

    return {
        url,
        state: rentValArr,
        label,
        paramsObj,
        seoData,
    };
}

// trans moreState->url,paramsObj,label,
// moreState: { directs: { 1: true, 2: true }, floorInfo: { 2: true, 3: true } }
export function stringifyMoreState(moreState) {
    let label = InitStateFilterLabel.more,
        url = '';
    const paramsObj = {
        directs: null,
        tags: null,
        areaInfo: null,
        floorInfo: null,
    };
    const seoData = {};


    const urlRtArr = [];
    let totalCount = 0;

    moreState && Object.keys(moreState).forEach((tagGroupType) => {
        const tagStateObj = moreState[tagGroupType];

        const urlArr = [];
        let itemStr = '';

        tagStateObj && Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            // if选中
            if (isSelected) {
                totalCount++;
                urlArr.push(tagIndex);

                const tagItem = MoreFilterTagData[tagGroupType][tagIndex];
                const tagValue = tagItem.value;
                label = tagItem.text;

                // 如果没有，初始化为数组
                if (!paramsObj[tagGroupType]) {
                    paramsObj[tagGroupType] = [tagValue];
                    seoData[tagGroupType] = [label]
                } else {
                    paramsObj[tagGroupType].push(tagValue);
                    seoData[tagGroupType].push(label);
                }
            }
        });

        // 1l2
        itemStr = urlArr.join(FILTER_ITEM_SEPARATOR);

        const prefix = TypeAndPrefixMap[tagGroupType];
        // item字符串非空
        itemStr && urlRtArr.push(prefix + itemStr);
    });

    if (totalCount > 1) {
        label = '多选';
    }

    url = urlRtArr.join(FILTER_SEPARATOR);

    return {
        label,
        paramsObj,
        url,
        seoData,
    };
}
// trans houseTypeState->url,paramsObj,label
// houseTypeState, ex: { sharedRooms: { 1: true, 2: true }, wholeRooms: { 3: true, 4: false } }
export function stringifyHouseTypeState(houseTypeState) {
    let label = InitStateFilterLabel.houseType,
        url = '';
    const paramsObj = {
        sharedRooms: null,
        wholeRooms: null,
    };
    const seoData = {};

    // 总共选中的tag数量
    let totalCount = 0;
    const urlRtArr = [];

    houseTypeState && Object.keys(houseTypeState).forEach((tagGroupType) => {
        const tagStateObj = houseTypeState[tagGroupType];

        const urlArr = [];
        let itemStr = '';

        tagStateObj && Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            // if选中
            if (isSelected) {
                urlArr.push(tagIndex);
                ++totalCount;

                const tagItem = HouseTypeFilterTagData[tagGroupType][tagIndex];
                const tagValue = tagItem.value;
                const tagText = tagItem.text === '不限' ? '' : tagItem.text;

                // 如果没有，初始化为数组
                if (!paramsObj[tagGroupType]) {
                    seoData[tagGroupType] = [tagText];
                    paramsObj[tagGroupType] = [tagValue];
                } else {
                    seoData[tagGroupType].push(tagText);
                    paramsObj[tagGroupType].push(tagValue);
                }

                if (totalCount === 1) {
                    label = (
                        tagGroupType === 'sharedRooms' ? '合租' : '整租'
                    ) + tagText;
                }
            }
        });
        // 1l2
        itemStr = urlArr.join(FILTER_ITEM_SEPARATOR);

        const prefix = TypeAndPrefixMap[tagGroupType];
        // item字符串非空
        itemStr && urlRtArr.push(prefix + itemStr);
    });

    if (totalCount > 1) {
        label = '多选';
    }

    url = urlRtArr.join(FILTER_SEPARATOR);

    return {
        label,
        paramsObj,
        url,
        seoData,
    };
}
// tagsUrlObj: { f: 2l3, g:4 }
// return stateObj: { sharedRooms: { 2: true, 3: true }, wholeRooms: { 4: true } }
function parseTagsUrlToState(tagsUrlObj) {
    const stateObj = {};

    tagsUrlObj && Object.keys(tagsUrlObj).forEach((prefix) => {
        const valueStr = tagsUrlObj[prefix];
        if (!valueStr) return;

        const correspondStateObj = {};
        const valueArr = valueStr.split(FILTER_ITEM_SEPARATOR);
        valueArr.forEach((value) => {
            correspondStateObj[value] = true;
        });

        stateObj[TypeAndPrefixMap[prefix]] = correspondStateObj;
    });

    return stateObj;
}

// trans houseTypeUrlObj->state,paramsObj,label
// houseTypeUrlObj: { f: 2l3, g:4 }
function parseHouseTypeUrl(houseTypeUrlObj) {
    const houseTypeState = parseTagsUrlToState(houseTypeUrlObj);
    const {
        url,
        paramsObj,
        label,
        seoData,
    } = stringifyHouseTypeState(houseTypeState);

    return {
        url,
        state: houseTypeState,
        paramsObj,
        label,
        seoData,
    };
}
// trans moreUrlObj->state,paramsObj,label
// moreUrlObj: { h: 2l3, j:4 }
function parseMoreUrl(moreUrlObj) {
    const moreState = parseTagsUrlToState(moreUrlObj);
    const {
        url,
        label,
        paramsObj,
        seoData,
    } = stringifyMoreState(moreState);

    return {
        url,
        state: moreState,
        paramsObj,
        label,
        seoData,
    };
}

// ptUrl: a123-b213
export function parsePositionUrlToStateAndLabel(ptUrl) {
    let label = { ...InitStateFilterLabel.position };
    const ptStateObj = { ...InitStateFilterState.position };
    const seoData = [];

    const positionStore = window.getStore('positionFilterDataObj')
    const positionFilterDataObj = positionStore && positionStore.data;
    if (!ptUrl || !positionFilterDataObj) {
        return {
            label,
            state: ptStateObj,
            seoData,
        };
    }

    const ptUrlObj = _transFilterUrlFrg(ptUrl);
    const {
        paramsObj,
    } = parsePositionUrlToParams(ptUrlObj);

    const PrefixMapPtType = {
        a: 'districts',
        c: 'subways',
    };

    let firstObj,
        firstId;

    Object.keys(ptUrlObj).forEach((alpha, index) => {
        const idVal = ptUrlObj[alpha];

        if (index === 0) {
            ptStateObj.firstItemSelectedIndex = alpha === 'a' ? 0 : 1;
            const firstType = PrefixMapPtType[alpha];
            firstObj = positionFilterDataObj[firstType];
            firstId = idVal;
            label = firstObj[idVal].text;
            seoData.push(label);

            const firstIdArr = Object.keys(firstObj);
            ptStateObj.secondItemSelectedIndex = firstIdArr.indexOf(idVal);
            return;
        }

        if (index === 1) {
            const secondObj = firstObj[firstId].sub;
            label = secondObj[idVal];
            seoData.push(label);

            const secondIdArr = Object.keys(secondObj);
            ptStateObj.thirdItemSelectedIndex = secondIdArr.indexOf(idVal);
        }
    });

    return {
        label,
        seoData,
        state: ptStateObj,
        paramsObj,
    };
}

// ptUrlObj: {a:123, b:21 } or {c:1234: d:1234}
function parsePositionUrlToParams(ptUrlObj) {
    const paramsObj = {
        districtId: null,
        circleId: null,
        subwayId: null,
        stationId: null,
    };
    const urlArr = [];

    ptUrlObj && Object.keys(ptUrlObj).forEach((alpha) => {
        if (ptUrlObj[alpha]) {
            paramsObj[TypeAndPrefixMap[alpha]] = parseInt(ptUrlObj[alpha], 10);
            urlArr.push(`${alpha}${ptUrlObj[alpha]}`);
        }
    });

    return {
        paramsObj,
        url: urlArr.join(FILTER_SEPARATOR),
    };
}

// 转换filterUrl->obj
// a123-b231-g3l4 -> { a:123, b:23, g:3l4}
function _transFilterUrlFrg(filterUrlFragment) {
    const filterUrlArr = filterUrlFragment.split(FILTER_SEPARATOR);
    const filterUrlObj = {};
    filterUrlArr.forEach((filerUrlItem) => {
        if (!filerUrlItem) return;
        const alpha = filerUrlItem.substr(0, 1);
        const value = filerUrlItem.substr(1);
        filterUrlObj[alpha] = value;
    });

    return filterUrlObj;
}

// trans url->state,label,paramsObj
// filterUrlFragment: a123-b234-e2000l4000-f1l2-g3
export function parseUrl(filterUrlFragment) {
    if (!filterUrlFragment) return;

    // filterUrlObj: { e:3000l4000, f:4l1 }
    const filterUrlObj = _transFilterUrlFrg(filterUrlFragment);

    // eslint-disable-next-line object-curly-newline
    const { a, b, c, d, e, f, g, h, j, k, n } = filterUrlObj;

    // eslint-disable-next-line object-curly-newline
    // 位置
    const {
        paramsObj: positionParamsObj,
        url: positionUrlFrg,
    } = parsePositionUrlToParams({ a, b, c, d });

    // 租金
    const {
        seoData: rentSeoData,
        url: rentUrlFrg,
        state: rentState,
        label: rentLabel,
        paramsObj: rentParamsObj,
    } = (e ? parseRentUrl({ e }) : {});

    // 房型
    const {
        seoData: houseTypeSeoData,
        url: houseTypeUrlFrg,
        state: houseTypeState,
        label: houseTypeLabel,
        paramsObj: houseTypeParamsObj,
    } = ((f || g) ? parseHouseTypeUrl({ f, g }) : {});

    // 更多
    const {
        seoData: moreSeoData,
        url: moreUrlFrg,
        state: moreState,
        label: moreLabel,
        paramsObj: moreParamsObj,
        // eslint-disable-next-line object-curly-newline
    } = ((h || j || k || n) ? parseMoreUrl({ h, j, k, n }) : {});
    console.log('seoData', {
        rent: rentSeoData,
        more: moreSeoData,
        houseType: houseTypeSeoData,
    });
    return {
        seoData: {
            rent: rentSeoData,
            more: moreSeoData,
            houseType: houseTypeSeoData,
        },
        urlFrg: {
            rent: rentUrlFrg,
            houseType: houseTypeUrlFrg,
            more: moreUrlFrg,
            position: positionUrlFrg,
        },
        state: Object.assign({}, {
            rent: rentState || InitStateFilterState.rent,
            houseType: houseTypeState || InitStateFilterState.houseType,
            more: moreState || InitStateFilterState.more,
        }),
        label: {
            rent: rentLabel || InitStateFilterLabel.rent,
            houseType: houseTypeLabel || InitStateFilterLabel.houseType,
            more: moreLabel || InitStateFilterLabel.more,
        },
        paramsObj: Object.assign(
            {},
            rentParamsObj,
            houseTypeParamsObj,
            moreParamsObj,
            positionParamsObj,
        ),
    };
}
