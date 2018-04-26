import { call, all, spawn, take, put } from 'redux-saga/effects';

import { ajaxPositionDistricts, ajaxPositionSubways } from 'reduxs/modules/ajax/ajaxSaga';
import { filterSagaActions } from './FilterRedux';
import { positionFilterSagaActions, positionFilterAjaxActions } from './PositionFilterRedux';

import { changeFilterPosition, transPositionFilterUrl } from './PositionFilterSaga';
import { transRentFilterUrl } from './RentFilterSaga';

import { FilterRentAlphaArr, FilterPositionAlphaArr } from 'const/filter';
import { sliceObjbyKeys } from 'lib/util';
import { transFilterUrlToObj } from './util';
// import { fetchSearchResults } from 'src/core/api';
// import history from 'src/core/history';
// import { getTracklistById } from 'src/core/tracklists';
// import { searchActions } from './actions';


// export function* loadSearchResults({payload}) {
//   const { query, tracklistId } = payload;
//   const tracklist = yield select(getTracklistById, tracklistId);
//   if (tracklist && tracklist.isNew) {
//     yield call(fetchSearchResults, tracklistId, query);
//   }
// }


//=====================================
//  WATCHERS
//-------------------------------------

// export function* watchLoadSearchResults() {
//   yield takeLatest(searchActions.LOAD_SEARCH_RESULTS, loadSearchResults);
// }

// export function* watchNavigateToSearch() {
//   while (true) {
//     const { payload } = yield take(searchActions.NAVIGATE_TO_SEARCH);
//     yield history.push(payload);
//   }
// }

/* watcher */
// 请求位置筛选的原始数据
function* watchPositionOriginData() {
    yield take(positionFilterSagaActions.POSITION_ORIGINDATA_INIT);
    const [subways, districts] = yield all([call(ajaxPositionSubways), call(ajaxPositionDistricts)]);
    yield put(positionFilterAjaxActions.fulfilled([subways, districts]));
}

// 筛选确认
function* watchFilterConfirm() {
    while (true) {
        const { payload } = yield take(filterSagaActions.FILTER_CONFIRM);
        const { type, state } = payload;
        yield call(changeFilterPosition, state);
    }
}

// filterUrl筛选
function* watchFilterUrl() {
    const { payload } = yield take(filterSagaActions.FILTERURL_INIT);
    const { filterUrl='' } = payload;
    const filterUrlObj = transFilterUrlToObj(filterUrl);
    // const filterPositionUrlObj = sliceObjbyKeys(filterUrlObj, FilterPositionAlphaArr);
    const filterRentUrlObj = sliceObjbyKeys(filterUrlObj, FilterRentAlphaArr);
    const filterPositionUrlObj = sliceObjbyKeys(filterUrlObj, FilterPositionAlphaArr);

    const yieldArr = [];
    filterPositionUrlObj && yieldArr.push(call(transPositionFilterUrl, filterPositionUrlObj));
    filterRentUrlObj && yieldArr.push(call(transRentFilterUrl, filterRentUrlObj));

    yield yieldArr;
}

const filterSagas = [
    spawn(watchPositionOriginData),
    spawn(watchFilterConfirm),
    spawn(watchFilterUrl),
    // fork(watchNavigateToFilter)
];
export default filterSagas;
