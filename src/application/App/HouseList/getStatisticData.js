// 由于自定义事件的统计，需要获取筛选器状态源数据
import HouseTypeOriginData from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilterTagData';
import MoreOriginData from 'components/App/HouseList/MoreFilter/MoreFilterTagData';
import { getObjectKeyByIndex } from 'lib/util';

// 路径关键字映射页面类型
// 注意 更详细的路径，位置在前
export const PathKeywordMapType = {
    // 品牌公寓主页精品门店页面
    'shop/exclusive': 'APARTMENT_BOUTIQUE_SHOP',
    // 集中式公寓门店列表页
    'shop/list': 'CENTRAL_APARTMENT',
    // 门店详情页
    'shop/detail': 'SHOP_DETAIL',
    // 房源详情页
    detail: 'HOUSE_DETAIL',
    // 首页/房源
    list: 'INDEX_HOUSE',
    // 首页/我的
    me: 'INDEX_ME',
    // 搜索页
    search: 'SEARCH',
    // 登录/注册页
    login: 'LOGIN',
    // 品牌公寓主页精品房源页面
    'apartment/?apartment': 'APARTMENT_BOUTIQUE_HOUSING',
    // 品牌公寓主页
    apartment: 'APARTMENT',
    // 品牌公寓主页附近房源页面
    nearby: 'APARTMENT_NEARBY_HOUSING',
    // 公寓评价页面
    comment: 'APARTMENT_COMMENT',
};

export const TypeMapText = {
    blocks: '小区',
    apartments: '优选公寓',
    subways: '地铁线',
    stations: '地铁站',
    districts: '区域',
    circles: '商圈',
    addresses: '地址',
};

const TypeMapParamKey = {
    sharedRooms: 'houseTypeShared',
    wholeRooms: 'houseTypeWhole',
    directs: 'toword',
    tags: 'feature',
    areaInfo: 'area',
    floorInfo: 'floor',
};

// 生成位置统计参数
function genPositionStatisticsParams() {
    const filterStore = window.getStore('filter');
    const positionState = filterStore && filterStore.state && filterStore.state.positionState;

    const positionStore = window.getStore('positionFilterDataObj');
    const originData = positionStore.data;

    if (originData && positionState) {
        const {
            firstItemSelectedIndex,
            secondItemSelectedIndex,
            thirdItemSelectedIndex,
        } = positionState;

        const firstText = firstKey =
            firstItemSelectedIndex !== -1 && getObjectKeyByIndex(originData, firstItemSelectedIndex);

        const secondObj = originData[firstKey];
        const secondKey = secondItemSelectedIndex !== -1 && getObjectKeyByIndex(secondObj, secondItemSelectedIndex);
        const secondText = secondObj[secondKey].text;

        const thirdObj = secondObj[secondKey].sub;
        const thirdKey = thirdItemSelectedIndex !== -1 && getObjectKeyByIndex(thirdObj, thirdItemSelectedIndex);
        const thirdText = thirdObj[thirdKey];

        const paramsObj = {};
        if (firstText === 'districts') {
            paramsObj.positionRegion = `区域_${secondText}_${thirdText}`;
        } else {
            paramsObj.positionMetro = `地铁_${secondText}_${thirdText}`;
        }

        return paramsObj;
    }
}

function genTagsDataByState(state, originData) {
    return Object.keys(state)
        .map(type => {
            const spliceText = Object.keys(state[type])
                .filter(index => state[type][index])
                .map(index => originData[type][index].text)
                .reduce(
                    (rt, text, index) => (
                        `${rt}` + (index === 0 ? '' : '_') + `${text}`
                    ),
                    '',
                );

            return {
                [TypeMapParamKey[type]]: spliceText,
            };
        })
        .reduce((rt, item) => Object.assign(rt, item), {});
}

// 生成租金统计参数
function genRentStatisticsParams() {
    const filterStore = window.getStore('filter');
    const rentState = filterStore && filterStore.state && filterStore.state.rent;
    if (rentState) {
        return {
            rentLow: rentState[0],
            rentHigh: rentState[1],
        };
    }
}

// 生成房型统计参数
function genHouseTypeStatisticsParams() {
    const filterStore = window.getStore('filter');
    const houseTypeState = filterStore && filterStore.state && filterStore.state.houseType;
    if (houseTypeState) {
        return genTagsDataByState(houseTypeState, HouseTypeOriginData);
    }
}

// 生成更多统计参数
function genMoreStatisticsParams() {
    const filterStore = window.getStore('filter');
    const moreState = filterStore && filterStore.state && filterStore.state.more;
    if (moreState) {
        return genTagsDataByState(moreState, MoreOriginData);
    }
}

// 生成搜索关键字参数
function genSearchStatisticsParams() {
    const searchStore = window.getStore('search');
    const keyword = searchStore && searchStore.searchRt;

    if (keyword) {
        return {
            keyword,
        };
    }
}

export function genFilterStatisticsParasm(paramsObj) {
    const positionParams = genPositionStatisticsParams();
    const rentParasm = genRentStatisticsParams();
    const houseTypeParams = genHouseTypeStatisticsParams();
    const moreParams = genMoreStatisticsParams();
    const searchParams = genSearchStatisticsParams();

    return {
        ...paramsObj,
        ...positionParams,
        ...rentParasm,
        ...houseTypeParams,
        ...moreParams,
        ...searchParams,
    };
}

export function genPageType() {
    const pathname = window.location.pathname;
    const pathKeyword = Object.keys(PathKeywordMapType)
        .find(keyword => pathname.indexOf(keyword) !== -1);

    // 定义的页面类型常量
    const pageType = PathKeywordMapType[pathKeyword];

    return pageType;
}
