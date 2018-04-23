import { fork, call, takeLatest, take, put } from 'redux-saga/effects';
import {
    INIT_HOUSELIST_ASYN,
    clearHouseListAction,
    addHouseListAction,
} from './HouseListRedux';
import ajaxHouseList from './ajaxHouseList';

function* initHouseList(action) {
    // 清空
    yield put(clearHouseListAction());

    // 添加
    yield* addHouseList(action);
}

function* addHouseList(action) {
    const {
        filterParamsObj = {},
        offset = 0,
        limit = 20,
    } = action.payload;
    const result = yield call(ajaxHouseList, { filterParamsObj, offset, limit });

    // 添加
    yield put(addHouseListAction(result));
}

/* watcher */
export function* watcherHouseList() {
    while(true) {
        const action = yield take(INIT_HOUSELIST_ASYN);
        yield call(initHouseList, action);
        yield takeLatest(ADD_HOUSELIST_ASYN, addHouseList);
    }
    // yield takeLatest(INIT_HOUSELIST_ASYN, initHouseList);
}

export default const houseListSagas = [
    fork(watcherHouseList),
];
