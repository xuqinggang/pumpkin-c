import withHistory from './utils';
import { loginRequired } from 'application/App/routes/enhance';
import { getFilterFixScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

// rentunit list
const createListPath = () => '/list';
export const goRentUnitList = withHistory(createListPath, {
    afterRouteChange: (history, to, next = () => null) => {
        // 800 毫秒等待渲染
        setTimeout(() => {
            console.log('xxx');
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
const createCommentInputPath = (apartmentId, rentUnitId) => `comment/${apartmentId}/input/${rentUnitId}`;
const createCommentListPath = apartmentId => `comment/${apartmentId}/list`;
export const goCommentInput = withHistory(createCommentInputPath, {
    beforeRouteChange: loginRequired,
});
export const goCommentList = withHistory(createCommentListPath);

// apartment
const createApartmentPath = apartmentId => `apartment/${apartmentId}`;
const createApartmentDeatilPath = apartmentId => `/apartment/${apartmentId}/detail`;
export const goApartment = withHistory(createApartmentPath);
export const goApartmentDetail = withHistory(createApartmentDeatilPath);

// shop
const createShopListPath = (filterParams = '') => `/shop/list/${filterParams}`;
const createShopDetailPath = shopId => `shop/detail/${shopId}`;
export const goShopList = withHistory(createShopListPath);
export const goShopDetail = withHistory(createShopDetailPath);

// rentUnit
const createRentUnitDeatilPath = rentUnitId => `/detail/${rentUnitId}`;
export const goRentUnitDetail = withHistory(createRentUnitDeatilPath);
