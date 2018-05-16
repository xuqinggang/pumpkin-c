import { select } from 'redux-saga/effects';
import { withHistory } from './utils';
import { pv } from './enhance';
import { filterUrlSelector } from 'reduxs/modules/Filter/FilterSelector';

export function* createHouseListPath() {
    const filterUrlFragment = yield select(filterUrlSelector);
    return `/list/${filterUrlFragment}`;
    // const urlSearch = yield select(urlSearchSelector);
    // return `/${filterUrlFragment}${urlSearch}`;
}
export const goHouseList = withHistory(createHouseListPath, { beforeRouteChange: pv });

const createHouseDetailPath = (rentUnitId) => `/detail/${rentUnitId}/`;
export const goHouseDetail = withHistory(createHouseDetailPath);

const createHouseSearchPath = () => '/search/';
export const goHouseSearch = withHistory(createHouseSearchPath);

export default {
    houseList: goHouseList,
    houseSearch: goHouseSearch,
    houseDetail: goHouseDetail,
};
