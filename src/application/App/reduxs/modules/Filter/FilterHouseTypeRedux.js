/* @flow */

import { createAction, handleActions } from 'redux-actions';

import HouseTypeOriginData from 'components/App/HouseList/TagsFilter/HouseTypeOriginData';

/* init state */
export const initStateHouseType: houseTypeReduxType = {
    state: {
        sharedRooms: {},
        wholeRooms: {},
    },
    params: {
        sharedRooms: null,
        wholeRooms: null,
    },
    label: '房型',
    url: '',
    originData: HouseTypeOriginData,
};

/* const actions */
// put
export const filterHouseTypePutActions = {
    UPDATE_FILTER_HOUSETYPE: 'update_filter_housetype',

    updateFilterHouseType: createAction('update_filter_housetype'),
};

export default handleActions({
    [filterHouseTypePutActions.UPDATE_FILTER_HOUSETYPE](state, action) {
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
}, initStateHouseType);
