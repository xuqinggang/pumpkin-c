import { put, call, select } from 'redux-saga/effects';

import { originDataMoreSelector } from './FilterSelector';
import { filterMorePutActions } from './FilterMoreRedux';

import { transTagsState, transTagsUrlObjToState } from './utils';

export function* transMoreFilterUrl(filterUrlObj) {
    const stateMore = transTagsUrlObjToState(filterUrlObj);
    yield call(changeMoreFilter, stateMore);
}

export function* changeMoreFilter(stateMore) {
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
