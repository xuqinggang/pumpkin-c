import { call, all, spawn, take, put } from 'redux-saga/effects';

import { filterSagaActions } from './FilterRedux';
import { positionFilterSagaActions, positionFilterAjaxActions, positionFilterPutActions } from './FilterPositionRedux';
import { searchPutActions } from 'reduxs/modules/Search/SearchRedux';
import { houseListSagaActions, houseListPutActions } from 'reduxs/modules/HouseList/HouseListRedux';
import { urlSagaActions } from 'reduxs/modules/Url/UrlRedux';

import { ajaxHouseListStep } from 'reduxs/modules/HouseList/HouseListSaga';
import { ajaxPositionDistricts, ajaxPositionSubways } from 'reduxs/modules/ajax/ajaxSaga';

import { changePositionFilter, transPositionFilterUrl } from './FilterPositionSaga';
import { changeRentFilter, transRentFilterUrl } from './FilterRentSaga';
import { changeMoreFilter, transMoreFilterUrl } from './FilterMoreSaga';
import { changeHouseTypeFilter, transHouseTypeFilterUrl } from './FilterHouseTypeSaga';

import {
    FilterRentAlphaArr,
    FilterPositionAlphaArr,
    FilterMoreAlphaArr,
    FilterHouseTypeAlphaArr,
} from 'const/filter';
import { sliceObjbyByKeys } from 'lib/util';
import { transFilterUrlToObj } from './utils';

const registChangeFilter = {
    position: changePositionFilter,
    rent: changeRentFilter,
    houseType: changeHouseTypeFilter,
    more: changeMoreFilter,
};

function* changeFilter(type, state) {
    console.log('changeFilter', type, state);
    const corresChangeFilter = registChangeFilter[type];
    yield call(corresChangeFilter, state);
}

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
        // 位置筛选 清空search和位置
        if (type === 'position') {
            // 清空搜索
            yield put(searchPutActions.searchClearPut());
            // 清空位置
            yield put(positionFilterPutActions.filterPositionClear());
        }

        // 清空houseList
        yield put(houseListPutActions.houseListClear());

        yield call(changeFilter, type, state);

        // 请求houseList
        yield call(ajaxHouseListStep);

        yield put(urlSagaActions.urlNavigate({ type: 'houseList' }));
    }
}

// filterUrl筛选-根据url更改state,params,label
export function* transFilterUrl(filterUrl) {
    // const { payload } = yield take(filterSagaActions.FILTERURL_INIT);
    // const { filterUrl = '' } = payload;
    const filterUrlObj = transFilterUrlToObj(filterUrl);
    // const filterPositionUrlObj = sliceObjbyByKeys(filterUrlObj, FilterPositionAlphaArr);
    const filterRentUrlObj = sliceObjbyByKeys(filterUrlObj, FilterRentAlphaArr);
    const filterPositionUrlObj = sliceObjbyByKeys(filterUrlObj, FilterPositionAlphaArr);
    const filterHouseTypeUrlObj = sliceObjbyByKeys(filterUrlObj, FilterHouseTypeAlphaArr);
    const filterMoreUrlObj = sliceObjbyByKeys(filterUrlObj, FilterMoreAlphaArr);

    const yieldArr = [];
    filterPositionUrlObj && yieldArr.push(call(transPositionFilterUrl, filterPositionUrlObj));
    filterRentUrlObj && yieldArr.push(call(transRentFilterUrl, filterRentUrlObj));
    filterHouseTypeUrlObj && yieldArr.push(call(transHouseTypeFilterUrl, filterHouseTypeUrlObj));
    filterMoreUrlObj && yieldArr.push(call(transMoreFilterUrl, filterMoreUrlObj));
    yield yieldArr;
}

const filterSagas = [
    spawn(watchPositionOriginData),
    spawn(watchFilterConfirm),
    // spawn(watchFilterUrl),
    // fork(watchNavigateToFilter)
];
export default filterSagas;
