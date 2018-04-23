import { fork, call, takeLatest, take, put, select } from 'redux-saga/effects';

import { houseListsSelector } from './HouseListSelector';
import { filterParamsSelector } from 'reduxs/modules/Filter/FilterSelector';

import { ajaxHouseList } from 'reduxs/modules/ajax/ajaxSaga';

import {
    SAGA_HOUSELIST_INIT,
    SAGA_HOUSELIST_ADD,
    houseListClearAction,
} from './HouseListRedux';

// 初始化房源列表(操作:默认,筛选,搜索)
function* initHouseList() {
    const houseList = yield select(houseListsSelector);

    // 判断是否为初始化，避免再次请求
    if (houseList && houseList.isInit) {
        // 清空
        yield put(houseListClearAction());

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
export function* watcherHouseList() {
    while(true) {
        yield take(SAGA_HOUSELIST_INIT);
        yield call(initHouseList);
        // yield takeLatest(SAGA_HOUSELIST_ADD, addHouseList);
    }
}

const houseListSagas = [
    fork(watcherHouseList),
];
export default houseListSagas;
