import { fork, call, take } from 'redux-saga/effects';

import { ajaxHouseIndexRecommend, ajaxHouseIndexBanner } from 'reduxs/modules/ajax/ajaxSaga';

import {
    houseIndexSagaActions,
} from './HouseIndexRedux';

/* watcher */
function* watcherHouseIndexInit() {
    yield take(houseIndexSagaActions.HOUSEINDEX_INIT);
    yield [call(ajaxHouseIndexBanner), call(ajaxHouseIndexRecommend)];
}

const houseIndexSagas = [
    fork(watcherHouseIndexInit),
];

export default houseIndexSagas;
