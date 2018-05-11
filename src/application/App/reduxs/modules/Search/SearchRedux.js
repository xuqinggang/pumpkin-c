/* @flow */

import { createAction, handleActions } from 'redux-actions';
import { dataApaterTopSearches } from './dataAdapter';

/* init state */
export const initStateSearch = {
    // 展现的搜索文案
    text: '',
    keyword: null,
    apartmentId: null,
    blockId: null,
    topSearches: [],
};

/* const actions */
// ajax
export const topSearchAjaxActions = {
    TOPSEARCHES_FULFILLED: 'topsearches_fulfilled',
    fulfilled: createAction('topsearches_fulfilled'),
};
// saga
export const searchSagaActions = {
    TOPSEARCHES_INIT: 'topsearches_init',
    SEARCH_CLEAR: 'search_clear',
    SEARCH_UPDATE: 'search_update',

    topSearchesInit: createAction('topsearches_init'),
    searchClear: createAction('search_clear'),
    searchUpdate: createAction('search_update'),
};
// put
export const searchPutActions = {
    SEARCH_UPDATE_PUT: 'search_update_put',
    SEARCH_CLEAR_PUT: 'search_clear_put',

    searchUpdatePut: createAction('search_update_put'),
    searchClearPut: createAction('search_clear_put'),
};

export default handleActions({
    [topSearchAjaxActions.TOPSEARCHES_FULFILLED](state, action) {
        return {
            ...state,
            topSearches: action.payload.topSearches || state.topSearches,
        };
    },
    [searchPutActions.SEARCH_UPDATE_PUT](state, action) {
        const {
            text,
            keyword,
            apartmentId,
            blockId,
        } = action.payload;

        return {
            ...state,
            text,
            keyword: keyword || state.keyword,
            apartmentId: apartmentId || state.apartmentId,
            blockId: blockId || state.blockId,
        };
    },
    [searchPutActions.SEARCH_CLEAR_PUT](state) {
        return {
            ...state,
            keyword: null,
            apartmentId: null,
            blockId: null,
            text: '',
        };
    },
}, initStateSearch);
