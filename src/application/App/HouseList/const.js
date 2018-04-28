import { reverseObjKeyValue } from 'lib/util';
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
export const TypeMapAlphaArr = {
    districts: [TypeAndPrefixMap.districtId, TypeAndPrefixMap.circleId],
    subways: [TypeAndPrefixMap.subwayId, TypeAndPrefixMap.stationId],
};

// 每个筛选条件内部的分隔符
export const FILTER_ITEM_SEPARATOR = 'l';
// 各个筛选条件连接的分隔符
export const FILTER_SEPARATOR = '-';
