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
export const AJAX_HOUSEINDEX_BANNER = 'ajax_houseindex_banner';
export const AJAX_HOUSEINDEX_RECOMMEND = 'ajax_houseindex_recommend';
// saga
export const SAGA_HOUSEINDEX_INIT = 'saga_houseindex_init';

/* action creator */
// ajax
const ajaxHouseIndexBanner = createAction(AJAX_HOUSEINDEX_BANNER);
export const ajaxHouseIndexBannerActions = {
    // pending: () => ({}),
    fulfilled: ajaxHouseIndexBanner,
    // failed: () => ({}),
};

const ajaxHouseIndexRecommend = createAction(AJAX_HOUSEINDEX_RECOMMEND);
export const ajaxHouseIndexRecommendActions = {
    // pending: () => ({}),
    fulfilled: ajaxHouseIndexRecommend,
    // failed: () => ({}),
}
// saga
export const sagaHouseIndexInitAction = createAction(SAGA_HOUSEINDEX_INIT);

/* reducer */
export default handleActions({
    [AJAX_HOUSEINDEX_BANNER](state, action) {
        const payload = action.payload || {};

        return {
            ...state,
            banner: {
                url: payload.url,
                avatar: payload.avatar,
            },
        };
    },
    [AJAX_HOUSEINDEX_RECOMMEND](state, action) {
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
