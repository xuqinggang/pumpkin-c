import { all } from 'redux-saga/effects';

import houseListSagas from 'reduxs/modules/HouseList/HouseListSaga';
import houseIndexSagas from 'reduxs/modules/HouseIndex/HouseIndexSaga';
import filterSagas from 'reduxs/modules/Filter/FilterSaga';
import urlSagas from 'reduxs/modules/Url/UrlSaga';
import searchSagas from 'reduxs/modules/Search/SearchSaga';
import locationSagas from 'reduxs/modules/Location/LocationSaga';


export default function* rootSaga () {
    // console.log('hello saga');
    // console.log(watcherHouseList);
    // yield takeEvery('test', function* test() {
    //     console.log('saga test');
    // });
    //
    // yield takeLatest(INIT_HOUSELIST_ASYN, initHouseList);

    try {
        yield all([
            ...houseListSagas,
            ...houseIndexSagas,
            ...filterSagas,
            ...urlSagas,
            ...searchSagas,
            ...locationSagas,
        ]);
    } catch(err) {
        console.log('rootSaga', err);
    }
    // yield fork(getLocatioFlow);
    // yield fork(getAdDataFlow);
    // yield fork(getULikeDataFlow);
    // yield fork(getDetailFolw);
    // yield fork(getCitiesFlow);
}
