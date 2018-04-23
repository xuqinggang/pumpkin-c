import { all } from 'redux-saga/effects';

import houseListSagas from 'reduxs/modules/HouseList/HouseListSaga';
import houseIndexSagas from 'reduxs/modules/HouseIndex/HouseIndexSaga';

export default function* rootSaga () {
    // console.log('hello saga');
    // console.log(watcherHouseList);
    // yield takeEvery('test', function* test() {
    //     console.log('saga test');
    // });
    //
    // yield takeLatest(INIT_HOUSELIST_ASYN, initHouseList);

    yield all([
        ...houseListSagas,
        ...houseIndexSagas,
    ]);
    // yield fork(getLocatioFlow);
    // yield fork(getAdDataFlow);
    // yield fork(getULikeDataFlow);
    // yield fork(getDetailFolw);
    // yield fork(getCitiesFlow);
}
