import {
    FILTER_SEPARATOR,
    TypeAndPrefixMap,
    parsePositionUrlToStateAndLabel,
} from 'application/App/HouseList/transState';
import { goHouseList } from 'application/App/routes/routes';


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

export function setFilterStore({type, urlFrg, state, label, paramsObj}) {
    const filterStore = window.getStore('filter');
    const {
        state: oldState,
        label: oldLabel,
        paramsObj: oldParamsObj,
        urlFrg: oldUrlFrg,
    } = filterStore;

    window.setStore('filter', {
        state: state ? Object.assign({}, oldState, { [type]: state }) : oldState,
        label: label ? Object.assign({}, oldLabel, { [type]: label }) : oldLabel,
        paramsObj: paramsObj ? Object.assign({}, oldParamsObj, paramsObj) : oldParamsObj,
        urlFrg: urlFrg ? Object.assign({}, oldUrlFrg, { [type]: urlFrg }) : oldUrlFrg,
    });
}

export function jumpHouseList(history) {
    const filterStore = window.getStore('filter');
    const {
        urlFrg = {},
    } = filterStore || {};

    const urlArr = [];
    Object.keys(urlFrg).forEach((type) => {
        const urlFrgVal = urlFrg[type];
        urlFrgVal && urlArr.push(urlFrgVal);
    });
    const url = urlArr.join(FILTER_SEPARATOR);
    window.setStore('url', {
        filterUrlFragment: url,
    });

    goHouseList(history)();
}
