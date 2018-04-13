import withHistory from './utils';
import { loginRequired, routeChangeToIOS } from 'application/App/routes/enhance';
import { getFilterFixScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

// rentunit list
const createListPath = ({
    filterParam = '', queryParam = {},
}) => {
    const queryArray = Object.keys(queryParam).map(key => `${key}=${queryParam[key]}`);
    const queryString = queryArray.join('&');
    return filterParam ? `/list/${filterParam}/?${queryString}` : `/list/?${queryString}`;
};
export const goRentUnitList = withHistory(createListPath, {
    afterRouteChange: (history, to, next = () => null) => {
        // 800 毫秒等待渲染
        setTimeout(() => {
            animateScrollTop(0, (757 * window.lib.flexible.rem) / 75, 300);
        }, 800);
    },
});
const createIndexPath = () => '/';
export const goIndex = withHistory(createIndexPath);

// login
const createLoginPath = () => '/login';
export const goLogin = withHistory(createLoginPath);

// comment
const createCommentInputPath = (apartmentId, rentUnitId) => `/comment/${apartmentId}/input/${rentUnitId}`;
const createCommentListPath = apartmentId => `/comment/${apartmentId}/list`;
export const goCommentInput = withHistory(createCommentInputPath, {
    beforeRouteChange: loginRequired,
});
export const goCommentList = withHistory(createCommentListPath, {
    beforeRouteChange: (history, to, next) => routeChangeToIOS(history, to, next, '公寓评价'),
});

// apartment
const createApartmentPath = apartmentId => `/apartment/${apartmentId}`;
const createApartmentDeatilPath = apartmentId => `/apartment/${apartmentId}/detail`;
export const goApartment = withHistory(createApartmentPath, {
    beforeRouteChange: (history, to, next) => routeChangeToIOS(history, to, next, '品牌公寓'),
});
export const goApartmentDetail = withHistory(createApartmentDeatilPath, {
    beforeRouteChange: (history, to, next) => routeChangeToIOS(history, to, next, '公寓详情'),
});

// shop
const createShopListPath = (filterParams = '') => `/shop/list/${filterParams}`;
const createShopDetailPath = shopId => `/shop/detail/${shopId}`;
export const goShopList = withHistory(createShopListPath, {
    beforeRouteChange: (history, to, next) => routeChangeToIOS(history, to, next, '精品门店'),
});
export const goShopDetail = withHistory(createShopDetailPath, {
    beforeRouteChange: (history, to, next) => routeChangeToIOS(history, to, next, '门店详情'),
});

// rentUnit
const createRentUnitDeatilPath = rentUnitId => `/detail/${rentUnitId}`;
export const goRentUnitDetail = withHistory(createRentUnitDeatilPath, {
    beforeRouteChange: (history, to, next) => routeChangeToIOS(history, to, next, '房源详情'),
});
