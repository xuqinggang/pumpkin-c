import { fork, call, takeLatest, take, put, select } from 'redux-saga/effects';

import { houseListsSelector } from './HouseListSelector';
import { filterParamsSelector } from 'reduxs/modules/Filter/FilterSelector';
import { filterSagaActions } from 'reduxs/modules/Filter/FilterRedux';
import { ajaxHouseList } from 'reduxs/modules/ajax/ajaxSaga';

import {
    houseListSagaActions,
    houseListPutActions,
} from './HouseListRedux';

// 初始化房源列表(操作:默认,筛选,搜索)
function* initHouseList({ filterUrl, search } = {}) {
    const houseList = yield select(houseListsSelector);

    // 判断是否为初始化，避免再次请求
    if (houseList && houseList.isInit) {
        // 清空
        yield put(houseListPutActions.houseListClear());
console.log('watchFilterUrl filterUrl', filterUrl);
        // 根据filterUrl初始化filterInfo
        yield put(filterSagaActions.filterUrlInit({ filterUrl, }))

        // 获得筛选参数
        const filterParams = yield select(filterParamsSelector);
        const { offset, limit } = houseList;

        // ajax请求
        yield call(ajaxHouseList, { filterParams, offset, limit });
    }
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
function* watcherHouseList() {
    while(true) {
        const { payload } = yield take(houseListSagaActions.HOUSELIST_INIT);
        yield call(initHouseList, payload);
        // yield takeLatest(SAGA_HOUSELIST_ADD, addHouseList);
    }
}

const houseListSagas = [
    fork(watcherHouseList),
];
export default houseListSagas;
