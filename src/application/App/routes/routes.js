import withHistory from './utils';
import { loginRequired } from 'application/App/routes/enhance';

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
const createShopListPath = () => '/shop/list';
const createShopDetailPath = shopId => `shop/detail/${shopId}`;
export const goShopList = withHistory(createShopListPath);
export const goShopDetail = withHistory(createShopDetailPath);

// rentUnit
const createRentUnitDeatilPath = rentUnitId => `/detail/${rentUnitId}`;
export const goRentUnitDetail = withHistory(createRentUnitDeatilPath);
