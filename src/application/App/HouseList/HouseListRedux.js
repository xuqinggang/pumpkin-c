import { createAction, handleActions } from 'redux-actions';
const initstate_houselist = {
    limit: 20,
    offset: 0,
    rentUnits: [],
    suggestRentUnits: [],
    total: 0,
    isLoading: false,
};

// const actions
// asyn
export const INIT_HOUSELIST_ASYN = 'init_houselist_asyn';
export const ADD_HOUSELIST_ASYN = 'add_houselist_asyn';

// syn
export const ADD_HOUSELIST = 'add_houselist';
export const CLEAR_HOUSELIST = 'clear_houselist';

// action creator
// export const initHouseListAction = createAction(INIT_HOUSELIST);

export const addHouseListAction = createAction(ADD_HOUSELIST);

export const clearHouseListAction = createAction(CLEAR_HOUSELIST);

// reducer
export default handleActions({
    // [INIT_HOUSELIST](state, action) {
    //     return action.payload;
    // },
    [ADD_HOUSELIST](state, action) {
        const {
            suggestRentUnits,
            rentUnits,
            ...otherPayload,
        } = action.payload;

        return {
            ...otherPayload,
            rentUnits: state.rentUnits.concat(rentUnits),
            suggestRentUnits: state.suggestRentUnits.concat(suggestRentUnits),
        };
    },
    [CLEAR_HOUSELIST]() {
        return {
            ...initstate_houselist,
        };
    },
}, initstate_houselist);
