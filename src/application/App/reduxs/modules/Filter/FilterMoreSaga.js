import { put, call, select } from 'redux-saga/effects';

import { originDataMoreSelector } from './FilterSelector';
import { filterMorePutActions } from './FilterHouseTypeRedux';

import { transTagsState, transTagsUrlObjToState } from './util';

export function* transFilterMoreUrl(filterUrlObj) {
    const stateMore = transTagsUrlObjToState(filterUrlObj);
    yield call(changeFilterMore, stateMore);
}

export function* changeFilterMore(stateMore) {
    const originDataMore = yield select(originDataMoreSelector);

    const {
        url,
        params,
        label,
    } = transTagsState(
        stateMore,
        originDataMore,
    );

    yield put(filterMorePutActions.updateFilterMore({ url, params, state: stateMore, label }));
}
