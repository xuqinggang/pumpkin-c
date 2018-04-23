import { call, put } from 'redux-saga/effects';

import { ajaxHouseListActions } from 'reduxs/modules/HouseList/HouseListRedux';
import {
    ajaxHouseIndexBannerActions,
    ajaxHouseIndexRecommendActions,
} from 'reduxs/modules/HouseIndex/HouseIndexRedux';

import ajax from './ajax';

function* ajaxEntities(ajaxFunction, actions, paramsObj) {
    console.log('ajaxEntities', ajaxFunction)
    try {
        actions.pending && (yield put(actions.pending()));
        const data = yield call(ajaxFunction, paramsObj);
        if (data.code === 200) {
            yield put(actions.fulfilled(data.data));
        } else {
            throw new Error(data.code);
        }
    } catch (error) {
        actions.failed && (yield put(actions.failed(error)));
    }
}

// houseList
export const ajaxHouseList = ajaxEntities.bind(null, ajax.ajaxHouseList, ajaxHouseListActions);

// houseIndex
export const ajaxHouseIndexBanner =
    ajaxEntities.bind(null, ajax.ajaxHouseIndexBanner, ajaxHouseIndexBannerActions);
export const ajaxHouseIndexRecommend =
    ajaxEntities.bind(null, ajax.ajaxHouseIndexRecommend, ajaxHouseIndexRecommendActions);
