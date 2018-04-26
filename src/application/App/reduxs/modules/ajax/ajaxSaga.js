import { call, put } from 'redux-saga/effects';

import { houseListAjaxActions } from 'reduxs/modules/HouseList/HouseListRedux';
import {
    houseBannerAjaxActions,
    houseRecommendAjaxActions,
} from 'reduxs/modules/HouseIndex/HouseIndexRedux';

import ajax from './ajax';

function* ajaxEntities(ajaxFunction, actions = {}, paramsObj) {
    try {
        actions.pending && (yield put(actions.pending()));
        const data = yield call(ajaxFunction, paramsObj);
        if (data.code === 200) {
            yield actions.fulfilled && put(actions.fulfilled(data.data));
        } else {
            throw new Error(data.code);
        }

        return data.data;
    } catch (error) {
        actions.failed && (yield put(actions.failed(error)));
        throw new Error(error);
    }
}

// houseList
export const ajaxHouseList = ajaxEntities.bind(null, ajax.ajaxHouseList, houseListAjaxActions);

// position originData
export const ajaxPositionSubways = ajaxEntities.bind(null, ajax.ajaxPositionSubways)
export const ajaxPositionDistricts = ajaxEntities.bind(null, ajax.ajaxPositionDistricts)

// houseIndex
export const ajaxHouseIndexBanner =
    ajaxEntities.bind(null, ajax.ajaxHouseIndexBanner, houseBannerAjaxActions);
export const ajaxHouseIndexRecommend =
    ajaxEntities.bind(null, ajax.ajaxHouseIndexRecommend, houseRecommendAjaxActions);

