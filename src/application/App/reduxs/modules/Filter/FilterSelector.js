import { createSelector } from 'reselect';

import { filterUrlFrgArrJoin } from './utils';

// position
const positionParamsSelector = state => state.filter.position.params;
export const positionStateSelector = state => state.filter.position.state;
export const positionUrlSelector = state => state.filter.position.url;
export const positionOriginDataSelector = state => state.filter.position.originData;

// rent
export const rentUrlSelector = state => state.filter.rent.url;
const rentParamsSelector = state => state.filter.rent.params;

// houseType
const houseTypeParamsSelector = state => state.filter.houseType.params;
export const houseTypeUrlSelector = state => state.filter.houseType.url;
export const houseTypeOriginDataSelector = state => state.filter.houseType.originData;

// more
const moreParamsSelector = state => state.filter.more.params;
export const moreUrlSelector = state => state.filter.more.url;
export const originDataMoreSelector = state => state.filter.more.originData;

// 筛选的所有信息
export const filterInfoSelector = state => state.filter;

export const filterParamsSelector = createSelector(
    positionParamsSelector,
    rentParamsSelector,
    houseTypeParamsSelector,
    moreParamsSelector,
    (positionParams, rentParams, houseTypeParams, moreParams) => ({
        ...positionParams,
        ...rentParams,
        ...houseTypeParams,
        ...moreParams,
    }),
);

export const filterUrlSelector = createSelector(
    positionUrlSelector,
    rentUrlSelector,
    houseTypeUrlSelector,
    moreUrlSelector,
    (...urlArr) => filterUrlFrgArrJoin(urlArr),
);

// route url-match.params.filterUrlFragment
export const filterMatchUrlSelector = (props) => {
    const params = props.match.params;
    return (params && params.filterUrlFragment) || '';
};
