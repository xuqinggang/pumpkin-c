/* @flow */

import { createAction, handleActions } from 'redux-actions';

import { dataAdapterPostion } from './dataAdapter';

/* init state */
export const initStatePosition: positionReduxType = {
    state: {
        firstIndex: 0,
        secondIndex: -1,
        thirdIndex: -1,
    },
    label: '位置',
    params: {
        districtId: null,
        circleId: null,
        subwayId: null,
        stationId: null,
    },
    url: '',
    originData: {
        districts: null,
        subways: null,
    },
};

/* const actions */
// ajax
export const positionFilterAjaxActions = {
    POSITION_ORIGINDATA_FULFILLED: 'position_origindata_fulfilled',

    fulfilled: createAction('position_origindata_fulfilled'),
};

// saga
export const positionFilterSagaActions = {
    POSITION_ORIGINDATA_INIT: 'position_origindata_init',

    positionOriginDataInit: createAction('position_origindata_init'),
};

// put
export const positionFilterPutActions = {
    UPDATE_FILTER_POSITION: 'update_filter_position',
    FILTER_POSITION_CLEAR: 'filter_position_clear',

    updateFilterPosition: createAction('update_filter_position'),
    filterPositionClear: createAction('filter_position_clear'),
};

export default handleActions({
    [positionFilterAjaxActions.POSITION_ORIGINDATA_FULFILLED](state, action) {
        const tmpOriginData = dataAdapterPostion(action.payload);
        return {
            ...state,
            originData: { ...state.originData, ...tmpOriginData },
        };
    },
    [positionFilterPutActions.UPDATE_FILTER_POSITION](state, action) {
        const {
            url,
            params,
            label,
            state: newState,
        } = action.payload;
        return {
            ...state,
            url: url === undefined ? state.url : url,
            label: label || state.label,
            state: newState === undefined ? state.state : { ...state.state, ...newState },
            params: params || state.params,
        };
    },
    [positionFilterPutActions.FILTER_POSITION_CLEAR](state) {
        const {
            originData,
            ...extra
        } = initStatePosition;

        return {
            ...state,
            ...extra,
        };
    },
}, initStatePosition);
