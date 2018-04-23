import { fork, call, take } from 'redux-saga/effects';

import { ajaxHouseIndexRecommend, ajaxHouseIndexBanner } from 'reduxs/modules/ajax/ajaxSaga';

import {
    SAGA_HOUSEINDEX_INIT,
} from './HouseIndexRedux';

function* initHouseIndex() {
    yield [call(ajaxHouseIndexBanner), call(ajaxHouseIndexRecommend)];
}

/* watcher */
function* watcherHouseIndex() {
    yield take(SAGA_HOUSEINDEX_INIT);
    yield call(initHouseIndex);
}

const houseIndexSagas = [
    fork(watcherHouseIndex),
];

export default houseIndexSagas;
