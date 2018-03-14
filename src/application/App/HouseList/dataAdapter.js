import { isValidValue } from 'lib/util';

const cvtBe2feRentUnit = data => ({
    apartmentName: data.apartmentName,
    area: data.area,
    address: (isValidValue(data.subwayLine)
        && isValidValue(data.subwayStation)
        && isValidValue(data.subwayDistance))
        ? `距离${data.subwayLine}${data.subwayStation}${data.subwayDistance}米`
        : '',
    tags: data.tags,
    imgUrl: data.image,
    floor: data.floor,
    totalFloor: data.totalFloor,
    rentalType: data.rentalType,
    blockName: data.blockName,
    bedroomCount: data.bedroomCount,
    direct: data.direct,
    price: data.price,
    rentUnitId: data.rentUnitId,
});

export default {
    cvtBe2feRentUnit,
};
