import { urlJoin, stringifyUrlSearch } from 'lib/util';
import { kzPv } from 'lib/pv';
import withHistory from './utils';
import { loginRequired, pv } from 'application/App/routes/enhance';

// login
const createLoginPath = (search = '') => `/login/${search}`;
export const goLogin = withHistory(createLoginPath);

// // comment
// const createCommentInputPath = (apartmentId, rentUnitId) => `comment/${apartmentId}/input/${rentUnitId}`;
// const createCommentListPath = apartmentId => `comment/${apartmentId}/list`;
// export const goCommentInput = withHistory(createCommentInputPath, {
//     beforeRouteChange: loginRequired,
// });

// export const goCommentList = withHistory(createCommentListPath);
// // apartment
// const createApartmentPath = apartmentId => `apartment/${apartmentId}`;
// const createApartmentDeatilPath = apartmentId => `/apartment/${apartmentId}/detail`;
// export const goApartment = withHistory(createApartmentPath);
// export const goApartmentDetail = withHistory(createApartmentDeatilPath);

// // shop
// const createShopListPath = () => '/shop/list';
// const createShopDetailPath = shopId => `shop/detail/${shopId}`;
// export const goShopList = withHistory(createShopListPath);
// export const goShopDetail = withHistory(createShopDetailPath);

// houseList
const createHouseListPath = () => {
    const urlStore = window.getStore('url') || {};
    const {
        filterUrlFragment,
        filterSearch = '',
    } = urlStore;
    return urlJoin('list', filterUrlFragment) + filterSearch;
};
export const goHouseList = withHistory(createHouseListPath, { beforeRouteChange: pv });

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
