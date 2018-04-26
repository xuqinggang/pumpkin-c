import { createAction, handleActions } from 'redux-actions';

import { rentUnitListAdapter } from './dataAdapter';

/* init state */
const initStateHouselist = {
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
export const houseListAjaxActions = {
    HOUSELIST_PENDING: 'houselist_pending',
    HOUSELIST_FULFILLED: 'houselist_fulfilled',
    HOUSELIST_FAILED: 'houselist_failed',

    pending: createAction('houselist_pending'),
    fulfilled: createAction('houselist_fulfilled'),
    failed: createAction('houselist_failed'),
};
// saga
export const houseListSagaActions = {
    HOUSELIST_INIT: 'houselist_init',
    HOUSELIST_ADD: 'houselist_add',

    houseListInit: createAction('houselist_init'),
    houseListAdd: createAction('houselist_add'),
};
// put
export const houseListPutActions = {
    HOUSELIST_CLEAR: 'houselist_clear',

    houseListClear: createAction('houselist_clear'),
};

// reducer
export default handleActions({
    [houseListAjaxActions.HOUSELIST_PENDING](state) {
        return {
            ...state,
            isPending: true,
        };
    },
    [houseListAjaxActions.HOUSELIST_FULFILLED](state, action) {
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
    [houseListAjaxActions.HOUSELIST_FAILED](state, action) {
        return {
            ...state,
            isPending: false,
            isError: true,
        };
    },
    [houseListPutActions.HOUSELIST_CLEAR]() {
        return {
            ...initStateHouselist,
        };
    },
}, initStateHouselist);
