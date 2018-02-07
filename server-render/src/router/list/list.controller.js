import { parseUrlToState } from 'application/App/HouseList/filterStateToUrl';
import { filterStateToParams } from 'application/App/HouseList/filterStateToParams';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';
import { ajaxInitHouseIndexBanner, ajaxInitHouseIndexRecommend } from 'application/App/HouseIndex/ajaxInitHouseIndex';

export default async (ctx, next) => {
    const filterUrlFragment = ctx.params.filterUrlFragment;

    // 设置位置相关数据
    await setPositionData();

    // 设置筛选数据
    const newFilterParamsObj = setFilterData(filterUrlFragment, ctx);

    // 设置列表页数据
    await setHouseListData(newFilterParamsObj);

    // 首页的banner和recommend
    await setHouseIndexBannerAndRecommend();

    await next();
};

async function setPositionData() {
    const positionFilterDataArr = await ajaxInitPositionData();
    window.setStore('positionFilterDataArr', { data: positionFilterDataArr });
}

function setFilterData(filterUrlFragment, ctx) {
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

    // 设置筛选的store
    window.setStore('filter', {
        filterState: newFilterState,
        filterParamsObj: newFilterParamsObj,
        filterLabel: filterParamsAndLabel.label,
    });

    // 渲染列表页 meta相关数据
    renderMetaData(filterParamsAndLabel.seoData, ctx);

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

async function setHouseIndexBannerAndRecommend() {
    // window变量是全局的，首页banner和recommend数据缓存到window上了,所以此处可利用缓存的数据
    // const houseIndexData = window.getStore('houseIndex');
    // if (houseIndexData && houseIndexData.indexBannerData && houseIndexData.indexRecommendArr) {
    //     return;
    // }

    const cityId = 1;
    await Promise.all([ajaxInitHouseIndexRecommend(cityId), ajaxInitHouseIndexBanner(cityId)])
        .then(dataArr =>  {
            window.setStore('houseIndex', {
                indexRecommendArr: dataArr[0],
                indexBannerData: dataArr[1],
            });
        })
}

// 渲染列表页 meta相关数据
function renderMetaData(seoData, ctx) {
    const keywordsArr = [];

    seoData.position && (keywordsArr.push('北京'+seoData.position.join('')+'租房'));
    seoData.rent && (keywordsArr.push('租金'+seoData.rent+'元'+'租房'));

    if (seoData.houseType) {
        const { sharedRooms, wholeRooms } = seoData.houseType;
        sharedRooms && (keywordsArr.push('合租'+sharedRooms.join('')+'租房'));
        wholeRooms && (keywordsArr.push('整租'+wholeRooms.join('')+'租房'));
    }

    if (seoData.more) {
        const { directs, areaInfo, tags, floorInfo, } = seoData.more
        directs && (keywordsArr.push('朝'+directs.join('或')+'租房'));
        areaInfo && (keywordsArr.push('面积'+areaInfo.join('或')+'租房'));
        floorInfo && (keywordsArr.push('楼层'+floorInfo.join('或')+'租房'));
        tags && (keywordsArr.push('特点'+tags.join('和')+'租房'));
    }

    const keywords = keywordsArr.join(',');

    ctx.state.keywords = keywords;
    ctx.state.description = keywords + '.' + '南瓜租房是一款专注长公寓领域的平台型产品,其设计旨在帮助毕业0~5年的新时代年轻人快速租到心仪的房源,平台所有房源以高品质和真实为首要目标.'
    ctx.state.title = keywordsArr.join('_');
}
