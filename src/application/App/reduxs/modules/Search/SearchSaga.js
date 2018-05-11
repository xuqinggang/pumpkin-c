import { fork, call, take, put } from 'redux-saga/effects';

import { ajaxTopSearches } from 'reduxs/modules/ajax/ajaxSaga';

import { positionFilterPutActions } from 'reduxs/modules/Filter/FilterPositionRedux';
import { transPositionFilterUrl } from 'reduxs/modules/Filter/FilterPositionSaga';
import { ajaxHouseListStep } from 'reduxs/modules/HouseList/HouseListSaga';
import { houseListPutActions } from 'reduxs/modules/HouseList/HouseListRedux';
import { urlSagaActions } from 'reduxs/modules/Url/UrlRedux';
import { searchPutActions, searchSagaActions } from './SearchRedux';
import { genPositionUrlObj, removeEmTag } from './utils';

export function* clear() {
    // 清空搜索
    yield put(searchPutActions.searchClearPut());
    // 清空位置
    yield put(positionFilterPutActions.filterPositionClear());
    // 清空houseList
    yield put(houseListPutActions.houseListClear());
}

/* watcher */
function* watcherSearchUpdate() {
    while (true) {
        const { payload } = yield take(searchSagaActions.SEARCH_UPDATE);
        const {
            keyword,
            type,
            text,
            field,
            fieldValue,
            superField,
            superFieldValue,
        } = payload;

        // 清空
        yield call(clear);

        // 搜索文案
        let newText = keyword;
        if (!newText) {
            newText = removeEmTag(text);
        }

        if (type === 'subways' || type === 'stations' || type === 'districts' || type === 'circles') {
            const positionUrlObj = genPositionUrlObj({
                superField, // districtId or undefined
                superFieldValue, // 2
                field, // circleId or districtId
                fieldValue, // 6169
            });
            // 更新位置相关
            yield call(transPositionFilterUrl, positionUrlObj);

            // 更新搜索文案
            yield put(searchPutActions.searchUpdatePut({
                text: newText,
            }));
        } else if (type === 'keywords') {
            yield put(searchPutActions.searchUpdatePut({
                keyword,
                text: newText,
            }));
        } else {
            // apartments addresses blocks类型没有superField相关
            yield put(searchPutActions.searchUpdatePut({
                text: newText,
                [field]: fieldValue,
            }));
        }

        // 跳转
        yield put(urlSagaActions.urlNavigate({ type: 'houseList' }));
    }
}

function* watcherSearchClear() {
    while (true) {
        yield take(searchSagaActions.SEARCH_CLEAR);
        // 清空
        yield call(clear);
        // 请求houseList
        yield call(ajaxHouseListStep);
        // 跳转更改url
        yield put(urlSagaActions.urlNavigate({ type: 'houseList' }));
    }
}

function* watcherSearchInit() {
    yield take(searchSagaActions.TOPSEARCHES_INIT);
    yield call(ajaxTopSearches);
}

const searchSagas = [
    fork(watcherSearchInit),
    fork(watcherSearchUpdate),
    fork(watcherSearchClear),
];

export default searchSagas;
