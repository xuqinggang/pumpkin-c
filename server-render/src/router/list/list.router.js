import Router from 'koa-router';
import { parseUrlToState } from 'application/App/HouseList/filterStateToUrl';
import { filterStateToParams } from 'application/App/HouseList/filterStateToParams';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';

const router = new Router();

router.get('/:filterUrlFragment?', async (ctx, next) => {
    console.log('houseListRes before!!!!!!')
    
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

    window.setStore('filter', {
        filterState: newFilterState,
        filterParamsObj: newFilterParamsObj,
        filterLabel: filterParamsAndLabel.label,
    });

    // console.log('newFilterParamsObj', newFilterParamsObj);

    // console.log('filterStateToParams', filterUrlFragment, newFilterParamsObj, filterParamsAndLabel, filterState);
    const houseListRes = await fetchRentUnitList({ filter: newFilterParamsObj, pager: { curPage: 1, totalPage: 1 } });
console.log('houseListRes!!!!!!')
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
    // console.log('houseListStore', JSON.stringify(houseListStore));
    window.setStore('houseList', houseListStore);
    await next();
    // const houseDetailData = await ajaxInitHouseDetailData(ctx.params.rentUnitId);
    // ctx.state.title = houseDetailData && houseDetailData.houseProfileData &&houseDetailData.houseProfileData.title;

    // window.setStore('houseDetail', {
    //     [ctx.params.rentUnitId]: houseDetailData
    // });

    // await next();
    // await  ctx.render('index')
    // console.log('detail.router')
    // const houseDetailData = await 123;
    // next();
});

export default router;
