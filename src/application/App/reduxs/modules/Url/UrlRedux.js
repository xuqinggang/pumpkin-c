import { createAction, handleActions } from 'redux-actions';

/* state */
const initUrlState = {
    prefix: '',
    search: '',
};

/* const actions */
export const urlSagaActions = {
    URL_NAVIGATE: 'url_navigate',
    urlNavigate: createAction('url_navigate'),
};

export const urlPutActions = {
    URL_PREFIX: 'url_prefix',
    URL_SEARCH: 'url_search',

    urlPrefix: createAction('url_prefix'),
    urlSearch: createAction('url_search'),
};

export default handleActions({
    [urlPutActions.URL_PREFIX](state, action) {
        return {
            ...state,
            prefix: action.payload || state.prefix,
        };
    },
    [urlPutActions.URL_SEARCH](state, action) {
        return {
            ...state,
            search: action.payload || state.search,
        };
    },
}, initUrlState);
