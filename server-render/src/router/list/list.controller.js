import { parseUrlToState } from 'application/App/HouseList/filterStateToUrl';
import { filterStateToParams } from 'application/App/HouseList/filterStateToParams';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';

export default async (ctx, next) => {
    const filterUrlFragment = ctx.params.filterUrlFragment;

    // 设置位置相关数据
    await setPositionData();

    // 设置筛选数据
    const newFilterParamsObj = await setFilterData(filterUrlFragment);

    // 设置列表页数据
    await setHouseListData(newFilterParamsObj);

    await next();
};

async function setPositionData() {
    const positionFilterDataArr = await ajaxInitPositionData();
    window.setStore('positionFilterDataArr', { data: positionFilterDataArr });
}

async function setFilterData(filterUrlFragment) {
    // gen state
    const filterState = parseUrlToState(filterUrlFragment);
    // filterState中 position包含state和params信息
    const { position: positionStateAndParams, ...extraTypeFilterState } = filterState;
    const newFilterState = { ...extraTypeFilterState, position: positionStateAndParams && positionStateAndParams.state };
    // gen paramsAndlabel
    const filterParamsAndLabel = filterStateToParams(newFilterState);
    console.log('filterStateToParams', filterParamsAndLabel);

    const newFilterParamsObj = Object.assign({},
        filterParamsAndLabel.filterParams,
        positionStateAndParams && positionStateAndParams.params,
    );

    // 设置筛选的store
    window.setStore('filter', {
        filterState: newFilterState,
        filterParamsObj: newFilterParamsObj,
        filterLabel: filterParamsAndLabel.label,
    });

    return newFilterParamsObj;
}

async function setHouseListData(filterParamsObj) {
    const houseListRes = await fetchRentUnitList({ filter: filterParamsObj, pager: { curPage: 1, totalPage: 1 } });
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
}
