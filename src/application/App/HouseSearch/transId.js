import {
    FILTER_SEPARATOR,
    TypeAndPrefixMap,
    parsePositionUrlToStateAndLabel,
} from 'application/App/HouseList/transState';


// const superFieldMapType = {
//     districtId: 'districts',
//     subwayId: 'subways',
// };
// -> state, label, url, params
export function parsePositionSearchToFilterInfo({
    superField, // districtId or undefined
    superFieldValue, // 2
    field, // circleId or districtId
    fieldValue, // 6169
}) {
    const urlArr = [];
    if (!superField) {
        field && urlArr.push(`${TypeAndPrefixMap[field]}${fieldValue}`);
    } else {
        superField && urlArr.push(`${TypeAndPrefixMap[superField]}${superFieldValue}`);
        field && urlArr.push(`${TypeAndPrefixMap[field]}${fieldValue}`);
    }

    const urlFrg = urlArr.join(FILTER_SEPARATOR);

    const {
        label,
        state,
        paramsObj,
    } = parsePositionUrlToStateAndLabel(urlFrg);

    return {
        urlFrg,
        label,
        state,
        paramsObj,
    };
}
