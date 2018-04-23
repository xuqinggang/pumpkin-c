import { createAction, handleActions } from 'redux-actions';

/* init state */
const initstate_position = {
    state: {
        firstId: 0,
        secondId: -1,
        thirdId: -1,
    },
    label: '位置',
    Params: {},
};

/* const actions */
export const CHANGE_FILTER_POSITION = 'change_filter_position';

export default handleActions({
    [CHANGE_FILTER_POSITION](state, action) {
        return {
            ...state,
            state: action.payload.state,
        };
    },
}, initstate_position);
