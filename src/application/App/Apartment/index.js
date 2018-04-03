import ApartmentIndex from './ApartmentIndex';
import ApartmentDetail from './ApartmentDetail';

import withHistory from 'application/App/routes/utils';

const createApartmentDeatilPath = apartmentId => `/apartment/${apartmentId}/detail`;
const goApartmentDetail = withHistory(createApartmentDeatilPath);

export {
    ApartmentIndex,
    ApartmentDetail,
    goApartmentDetail,
};
