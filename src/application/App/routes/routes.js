import withHistory from './utils';
import { routeChangeToIOS, pv, withSearch } from 'application/App/routes/enhance';
import { urlJoin } from 'lib/util';
import { kzPv } from 'lib/pv';

const createIndexPath = () => '/';
export const goIndex = withHistory(createIndexPath);

// comment
const createCommentInputPath = (apartmentId, rentUnitId) => `/comment/${apartmentId}/input/${rentUnitId}`;
const createCommentListPath = (apartmentId, newCommentId) => {
    const search = newCommentId ? `?newCommentId=${newCommentId}` : '';
    return `/comment/${apartmentId}/list${search}`;
};
export const goCommentInput = withHistory(createCommentInputPath);
export const goCommentList = withHistory(createCommentListPath, {
    beforeRouteChange: [
        (history, to, next) => routeChangeToIOS(history, to, next, '公寓评价'),
        withSearch,
    ],
});

// apartment
const createApartmentPath = apartmentId => `/apartment/${apartmentId}`;
const createApartmentDeatilPath = apartmentId => `/apartment/${apartmentId}/detail`;
export const goApartment = withHistory(createApartmentPath, {
    beforeRouteChange: [
        (history, to, next) => routeChangeToIOS(history, to, next, '品牌公寓'),
        withSearch,
    ],
});
export const goApartmentDetail = withHistory(createApartmentDeatilPath, {
    beforeRouteChange: [
        (history, to, next) => routeChangeToIOS(history, to, next, '公寓详情'),
        withSearch,
    ],
});

// shop
const createShopListPath = (filterParams = '') => `/shop/list/${filterParams}`;
const createExclusiveShopPath = (filterParams = '') => `/shop/exclusive/${filterParams}`;
const createShopDetailPath = shopId => `/shop/detail/${shopId}`;
export const goShopList = withHistory(createShopListPath, {
    beforeRouteChange: [
        (history, to, next) => routeChangeToIOS(history, to, next, '精品门店'),
        withSearch,
    ],
});
/**
 * 是否是改变当前页的一些参数
 * 改变本页的一些参数认为是没有跳页
 */
export const changeExclusiveShopQuery = withHistory(createExclusiveShopPath, {
    beforeRouteChange: [
        withSearch,
    ],
});
export const goExclusiveShop = withHistory(createExclusiveShopPath, {
    beforeRouteChange: [
        (history, to, next) => routeChangeToIOS(history, to, next, '精品门店'),
        withSearch,
    ],
});
export const goShopDetail = withHistory(createShopDetailPath, {
    beforeRouteChange: [
        (history, to, next) => routeChangeToIOS(history, to, next, '门店详情'),
        withSearch,
    ],
});

// login
const createLoginPath = (search = '') => `/login/${search}`;
export const goLogin = withHistory(createLoginPath);

// houseList
const createHouseListPath = () => {
    const urlStore = window.getStore('url') || {};
    const {
        filterUrlFragment,
        filterSearch = '',
    } = urlStore;
    return urlJoin('list', filterUrlFragment) + filterSearch;
};
const createApartmentHouseListPath = () => {
    const urlStore = window.getStore('apartmentHouseUrl') || {};
    const {
        filterUrlFragment,
        filterSearch = '',
    } = urlStore;
    return urlJoin('list/apartment', filterUrlFragment) + filterSearch;
};
export const goHouseList = withHistory(createHouseListPath, { beforeRouteChange: pv });
export const goApartmentHouseList = withHistory(createApartmentHouseListPath, { beforeRouteChange: pv });

// houseDetail
const createHouseDetailPath = rentUnitId => `/detail/${rentUnitId}/`;
export const goHouseDetail = withHistory(createHouseDetailPath, {
    beforeRouteChange: [
        pv,
        function kzPvIfDaili(history, url, next) {
            const urlStore = window.getStore('url');
            if (urlStore && urlStore.filterQueryFieldsObj && urlStore.filterQueryFieldsObj.daili) {
                kzPv(urlStore.filterQueryFieldsObj.daili, 'nangua_daili_detail');
            }
            next();
        },
        (history, to, next) => routeChangeToIOS(history, to, next, '房源详情')
    ],
});

// houseReport
const createHouseReportPath = rentUnitId => `/detail/${rentUnitId}/report/`;
export const goHouseReport = withHistory(createHouseReportPath);

// login
const createLoginTel = tel => `/login/${tel}/${window.location.search}`;
export const goLoginTel = withHistory(createLoginTel);

// about
const createAbout = () => '/about/';
export const goAbout = withHistory(createAbout);

// me
const createMePath = () => '/me/';
export const goMe = withHistory(createMePath);

const createEditTelPath = () => '/me/info/edittel/';
export const goEditTel = withHistory(createEditTelPath);

const createEditTelVerifyPath = tel => `/me/info/edittel/${tel}/`;
export const goEditTelVerify = withHistory(createEditTelVerifyPath);

// city
const createCityPath = () => '/city/';
export const goCity = withHistory(createCityPath);

// search
const createSearchPath = () => '/search/';
export const goSearch = withHistory(createSearchPath);
