import { createAction, handleActions } from 'redux-actions';

/* init state */
const initStateLoaction = {
    isLocating: false,
    lnglat: [116.32558, 39.98359],
    locCity: '', // 定位的城市 bj
    curCity: '', // 当前展示的城市
};

/* actions const */
export const locationPutActions = {
    LOCATION_ADD: 'location_add',
    locationAdd: createAction('location_add'),
};

export const locationSagaActions = {
    LOCATION_CITY: 'location_city',
    LOCATION_LNGLAT: 'location_lnglat',
    locationCity: createAction('location_city'),
    locationLngLat: createAction('location_lnglat'),
};

export default handleActions({
    [locationPutActions.LOCATION_ADD](state, action) {
        const {
            isLocating,
            locCity,
            lnglat,
        } = action.payload;

        return {
            ...state,
            locCity: locCity !== undefined ? locCity : state.locCity,
            isLocating: isLocating !== undefined ? isLocating : state.isLocating,
            lnglat: lnglat !== undefined ? lnglat : state.lnglat,
        };
    },
}, initStateLoaction);
