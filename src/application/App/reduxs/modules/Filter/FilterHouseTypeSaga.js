import { put, call, select } from 'redux-saga/effects';

import { originDataHouseTypeSelector } from './FilterSelector';
import { filterHouseTypePutActions } from './FilterHouseTypeRedux';

import { FILTER_ITEM_SEPARATOR, FILTER_SEPARATOR, TypeAndPrefixMap } from 'const/filter';

import { transTagsState, transTagsUrlObjToState } from './util';

export function* transFilterHouseTypeUrl(filterUrlObj) {
    const stateHouseType = transTagsUrlObjToState(filterUrlObj);
    yield call(changeFilterHouseType, stateHouseType);
}

export function* changeFilterHouseType(stateHouseType) {
    const originDataHouseType = yield select(originDataHouseTypeSelector);

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
