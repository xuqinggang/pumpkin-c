/* @flow */

import { createAction, handleActions } from 'redux-actions';

import MoreFilterOriginData from 'components/App/HouseList/TagsFilter/MoreFilterOriginData';

/* init state */
export const initStateMore: moreReduxType = {
    state: {
        directs: {},
        tags: {},
        areaInfo: {},
        floorInfo: {},
    },
    label: '更多',
    params: {
        directs: null,
        tags: null,
        areaInfo: null,
        floorInfo: null,
    },
    url: '',
    originData: MoreFilterOriginData,
};

/* const actions */
// put
export const filterMorePutActions = {
    UPDATE_FILTER_MORE: 'update_filter_more',

    updateFilterMore: createAction('update_filter_more'),
};

export default handleActions({
    [filterMorePutActions.UPDATE_FILTER_MORE](state, action) {
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
}, initStateMore);
