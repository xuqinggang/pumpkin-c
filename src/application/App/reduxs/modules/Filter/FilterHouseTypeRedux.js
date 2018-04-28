import { createAction, handleActions } from 'redux-actions';

import HouseTypeFilterTagData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';

/* init state */
const initStateHouseType = {
    state: {
        sharedRooms: {},
        wholeRooms: {},
    },
    label: '房型',
    params: {
        sharedRooms: null,
        wholeRooms: null,
    },
    url: '',
    originData: HouseTypeFilterTagData,
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
