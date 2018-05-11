import { fork, call, takeLatest, take, put, select } from 'redux-saga/effects';

import { houseListsSelector } from './HouseListSelector';
import { filterParamsSelector } from 'reduxs/modules/Filter/FilterSelector';
import { searchParamsSelector } from 'reduxs/modules/Search/SearchSelector';

import { filterSagaActions } from 'reduxs/modules/Filter/FilterRedux';
import { ajaxHouseList } from 'reduxs/modules/ajax/ajaxSaga';
import { transFilterUrl } from 'reduxs/modules/Filter/FilterSaga';

import {
    houseListSagaActions,
    houseListPutActions,
} from './HouseListRedux';


// 请求房源列表
export function* ajaxHouseListStep() {
    const houseList = yield select(houseListsSelector);
    const {
        offset,
        limit,
    } = houseList;

    // 获得筛选参数
    const filterParams = yield select(filterParamsSelector);
    // 获得搜索参数
    const searchParams = yield select(searchParamsSelector);

    const params = Object.assign({}, filterParams, searchParams);

    // ajax请求
    yield call(ajaxHouseList, { params, offset, limit });
}

// 首次进入-初始化房源列表
function* initHouseList({ filterUrl, search } = {}) {
    const houseList = yield select(houseListsSelector);

    // 判断是否为初始化，避免再次请求
    if (houseList && houseList.isInit) {
        // 根据filterUrl初始化filterInfo
        yield call(transFilterUrl, filterUrl);
        // yield put(filterSagaActions.filterUrlInit({ filterUrl }));
        yield call(ajaxHouseListStep);
    }
}

// 筛选-初始化房源列表
function* filterHouseList() {
    yield put(houseListPutActions.houseListClear());
    yield call(ajaxHouseListStep);
}

// // 添加房源列表(操作:滚动)
// function* addHouseList(action = {}) {
//     const {
//         filterParams = {},
//         offset = 0,
//         limit = 20,
//     } = action.payload || {};
//     const result = yield call(ajaxHouseList, { filterParams, offset, limit });
// console.log('result', result);
//     // 添加
//     yield put(addHouseListAction(result));
// }

/* watcher */
function* watcherHouseListInit() {
    while (true) {
        const { payload } = yield take(houseListSagaActions.HOUSELIST_INIT);
        yield call(initHouseList, payload);
    }
}

function* watcherHouseListFilter() {
    yield takeLatest(houseListSagaActions.HOUSELIST_FILTER, filterHouseList);
}

const houseListSagas = [
    fork(watcherHouseListInit),
    fork(watcherHouseListFilter),
];
export default houseListSagas;
