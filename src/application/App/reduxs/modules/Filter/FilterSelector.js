import { createSelector } from 'reselect';

const positionParamsSelector = state => state.filter.position.params;

export const filterParamsSelector = createSelector(
    positionParamsSelector,
    (positionParams) => ({
        ...positionParams,
    })
);
