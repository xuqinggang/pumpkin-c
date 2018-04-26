import { createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import positionReducer from './PositionFilterRedux';
import rentReducer from './RentFilterRedux';

/* const actions */
export const filterSagaActions = {
    FILTER_CONFIRM: 'filter_confirm',
    FILTERURL_INIT: 'filterurl_init',

    filterConfirm: createAction('filter_confirm'),
    filterUrlInit: createAction('filterurl_init'),
};

export default combineReducers({
    position: positionReducer,
    rent: rentReducer,
});
