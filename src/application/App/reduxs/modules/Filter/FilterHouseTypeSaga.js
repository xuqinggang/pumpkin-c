import { put, call, select } from 'redux-saga/effects';

import { houseTypeOriginDataSelector } from './FilterSelector';
import { filterHouseTypePutActions } from './FilterHouseTypeRedux';

import { transTagsState, transTagsUrlObjToState } from './utils';

export function* transHouseTypeFilterUrl(filterUrlObj) {
    const stateHouseType = transTagsUrlObjToState(filterUrlObj);
    yield call(changeHouseTypeFilter, stateHouseType);
}

export function* changeHouseTypeFilter(stateHouseType) {
    const originDataHouseType = yield select(houseTypeOriginDataSelector);

    const {
        url,
        params,
        label,
    } = transTagsState(
        stateHouseType,
        originDataHouseType,
        function fixLabelFun(text, tagGroupType) {
            const tmpText = text === '不限' ? '' : text;
            return tagGroupType === 'sharedRooms' ? `合租${tmpText}` : `整租${tmpText}`;
        },
    );

    yield put(filterHouseTypePutActions.updateFilterHouseType({ url, params, state: stateHouseType, label }));
}
