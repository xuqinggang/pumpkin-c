/* @flow */

import { createAction, handleActions } from 'redux-actions';

/* init state */
export const initStateRent: rentReduxType = {
    state: [0, 20000],
    label: '租金',
    params: {
        priceInfo: null,
    },
    url: '',
};

/* const actions */
// put
export const filterRentPutActions = {
    UPDATE_FILTER_RENT: 'update_filter_rent',

    updateFilterRent: createAction('update_filter_rent'),
};

export default handleActions({
    [filterRentPutActions.UPDATE_FILTER_RENT](state: rentReduxType, action) {
        const {
            url,
            params,
            label,
            state: newState,
        } = action.payload;
        return {
            ...state,
            url,
            label: label || state.label,
            state: newState,
            params,
        };
    },
}, initStateRent);
