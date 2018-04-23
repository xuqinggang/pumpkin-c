import { createAction, handleActions } from 'redux-actions';

import { rentUnitListAdapter } from './dataAdapter';

/* init state */
const initstate_houselist = {
    limit: 20,
    offset: 0,
    rentUnits: [],
    suggestRentUnits: [],
    total: 0,
    isPending: false,
    isInit: true,
    isError: false,
};

/* actions const */
// ajax
export const AJAX_HOUSELIST_PENDING = 'ajax_houselist_pending';
export const AJAX_HOUSELIST_FULFILLED = 'ajax_houselist_fulfilled';
export const AJAX_HOUSELIST_FAILED = 'ajax_houselist_failed';
// saga
export const SAGA_HOUSELIST_INIT = 'saga_houselist_init';
export const SAGA_HOUSELIST_ADD = 'saga_houselist_add';
// export const SAGA_HOUSELIST_CLEAR = 'saga_houselist_clear';
// syn
export const HOUSELIST_CLEAR = 'houselist_clear';

/* action creator */
// ajax
const ajaxHouseListPending = createAction(AJAX_HOUSELIST_PENDING);
const ajaxHouseListFulfilled = createAction(AJAX_HOUSELIST_FULFILLED);
const ajaxHouseListFailed = createAction(AJAX_HOUSELIST_FAILED);
export const ajaxHouseListActions = {
    pending: ajaxHouseListPending,
    fulfilled: ajaxHouseListFulfilled,
    failed: ajaxHouseListFailed,
};
// saga
const sagaHouseListInit = createAction(SAGA_HOUSELIST_INIT);
const sagaHouseListAdd = createAction(SAGA_HOUSELIST_ADD);
export const sagaHouseListActions = {
    initHouseList: sagaHouseListInit,
    addHouseList: sagaHouseListAdd,
};
// syn
export const houseListClearAction = createAction(HOUSELIST_CLEAR);

// reducer
export default handleActions({
    // [INIT_HOUSELIST](state, action) {
    //     return action.payload;
    // },
    [AJAX_HOUSELIST_PENDING](state) {
        return {
            ...state,
            isPending: true,
        };
    },
    [AJAX_HOUSELIST_FULFILLED](state, action) {
        const {
            suggestRentUnits,
            rentUnits,
            ...otherPayload
        } = action.payload;

        return {
            ...otherPayload,
            rentUnits: state.rentUnits.concat(rentUnitListAdapter(rentUnits)),
            suggestRentUnits: state.suggestRentUnits.concat(rentUnitListAdapter(suggestRentUnits)),
            isError: false,
            isInit: false,
            isPending: false,
        };
    },
    [AJAX_HOUSELIST_FAILED](state, action) {
        return {
            ...state,
            isPending: false,
            isError: true,
        };
    },
    [HOUSELIST_CLEAR]() {
        return {
            ...initstate_houselist,
        };
    },
}, initstate_houselist);
