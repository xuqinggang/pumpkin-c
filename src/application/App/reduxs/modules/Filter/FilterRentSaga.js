import { put, call } from 'redux-saga/effects';

import { filterRentPutActions } from './FilterRentRedux';

import { FILTER_ITEM_SEPARATOR, TypeAndPrefixMap } from 'const/filter';

export function* transFilterRentUrl(filterUrlObj) {
    const alpha = TypeAndPrefixMap.priceInfo;
    const rentUrlStr = filterUrlObj[alpha];
    if (rentUrlStr) {
        const tmpRentState = rentUrlStr.split(FILTER_ITEM_SEPARATOR);
        const rentState = [parseInt(tmpRentState[0], 10), parseInt(tmpRentState[1], 10)];
        yield call(changeFilterRent, rentState);
    }
}

export function* changeFilterRent(rentState) {
    let url = '',
        label = '';
    const paramsObj = {};

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

    yield put(filterRentPutActions.updateFilterRent({ url, params: paramsObj, state: rentState, label }));
}
