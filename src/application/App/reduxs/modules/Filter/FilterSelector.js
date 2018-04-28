import { createSelector } from 'reselect';

const positionParamsSelector = state => state.filter.position.params;
export const statePositionSelector = state => state.filter.position.state;

export const filterParamsSelector = createSelector(
    positionParamsSelector,
    positionParams => ({
        ...positionParams,
    }),
);

// filter originData
export const originDataPositionSelector = state => state.filter.position.originData;
export const originDataHouseTypeSelector = state => state.filter.houseType.originData;

// 筛选的所有信息
export const filterInfoSelector = state => state.filter;

export const filterUrlSelector = props => {
    const params = props.match.params;
    console.log('filterUrlSelector', params, params.filterUrlFragment)
    return (params && params.filterUrlFragment) || '';
};
