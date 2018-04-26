import { createAction, handleActions } from 'redux-actions';

/* init state */
const initstate_houseindex = {
    banner: {
        url: '',
        avatar: '',
    },
    recommends: [],
};

/* actions const */
// ajax
export const houseBannerAjaxActions = {
    HOUSEINDEX_BANNER: 'houseindex_banner',

    fulfilled: createAction('houseindex_banner'),
};

export const houseRecommendAjaxActions = {
    HOUSEINDEX_RECOMMEND: 'houseindex_recommend',
    fulfilled: createAction('houseindex_recommend'),
};

// saga
export const houseIndexSagaActions = {
    HOUSEINDEX_INIT: 'houseindex_init',

    houseIndexInit: createAction('houseindex_init'),
};

/* reducer */
export default handleActions({
    [houseBannerAjaxActions.HOUSEINDEX_BANNER](state, action) {
        const payload = action.payload || {};

        return {
            ...state,
            banner: {
                url: payload.url,
                avatar: payload.avatar,
            },
        };
    },
    [houseRecommendAjaxActions.HOUSEINDEX_RECOMMEND](state, action) {
        const payload = action.payload || [];
        const recommends = payload.map(item => ({
            url: item.url,
            avatar: item.avatar,
        }));

        return {
            ...state,
            recommends,
        };
    },
}, initstate_houseindex);
