/* @flow */
// 转换state->url(url改变), params(请求参数), label(筛选器label)

import HouseTypeFilterTagData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';
import MoreFilterTagData from 'components/App/HouseList/MoreFilter/MoreFilterTagData';
import { FILTER_ITEM_SEPARATOR, FILTER_SEPARATOR, TypeAndPrefixMap, TypeMapAlphaArr } from './const';
import { InitStateFilterLabel } from './initState';

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

    if (rentState && rentState.length) {
        // [0, 20000] 代表无限，不拼接到url中
        if (!(rentState[0] === 0 && rentState[1] === 20000)) {
            const prefix = TypeAndPrefixMap.priceInfo;
            url = prefix + rentState.join(FILTER_ITEM_SEPARATOR);

            if (rentState[0] === 0) {
                label = `${rentState[1]}以下`;
                paramsObj.priceInfo = { floor: rentState[0], ceil: rentState[1] };
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

