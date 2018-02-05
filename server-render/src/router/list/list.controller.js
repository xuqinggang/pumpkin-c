import { parseUrlToState } from 'application/App/HouseList/filterStateToUrl';
import { filterStateToParams } from 'application/App/HouseList/filterStateToParams';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';

export default async (ctx, next) => {
    const positionFilterDataArr = await ajaxInitPositionData();
    window.setStore('positionFilterDataArr', { data: positionFilterDataArr });
    
    const filterUrlFragment = ctx.params.filterUrlFragment;

    // gen state
    const filterState = parseUrlToState(filterUrlFragment);
    // filterState中 position包含state和params信息
    const { position: positionStateAndParams, ...extraTypeFilterState } = filterState;
    const newFilterState = { ...extraTypeFilterState, position: positionStateAndParams && positionStateAndParams.state };
    // gen paramsAndlabel
    const filterParamsAndLabel = filterStateToParams(newFilterState);

    const newFilterParamsObj = Object.assign({},
        filterParamsAndLabel.filterParams,
        positionStateAndParams && positionStateAndParams.params,
    );

    console.log('filterParamsAndLabel', filterParamsAndLabel);

    // 设置筛选的store
    window.setStore('filter', {
        filterState: newFilterState,
        filterParamsObj: newFilterParamsObj,
        filterLabel: filterParamsAndLabel.label,
    });

    const houseListRes = await fetchRentUnitList({ filter: newFilterParamsObj, pager: { curPage: 1, totalPage: 1 } });
    let houseListStore = {
        isFetching: false,
        isFetchCrash: houseListRes.fetch.type === 'CRASH',
    };

    if (houseListRes.fetch.type === 'SUCCESS') {
        houseListStore = Object.assign(houseListStore, {
            rentUnitList: houseListRes.data.rentUnitList,
            suggestRentUnitList: houseListRes.data.suggestRentUnitList,
            pager: houseListRes.data.pager,
        });
    }

    window.setStore('houseList', houseListStore);
    await next();
};
