/* @flow */
// 转换url->state(筛选器状态改变), params(请求参数), label(筛选器label)

import { FILTER_ITEM_SEPARATOR, FILTER_SEPARATOR, TypeAndPrefixMap, TypeMapAlphaArr } from './const';
import { stringifyMoreState, stringifyHouseTypeState, stringifyRentState } from './stringifyState';
import { InitStateFilterLabel, InitStateFilterState } from './initState';

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

