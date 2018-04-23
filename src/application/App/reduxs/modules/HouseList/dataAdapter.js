import { isValidValue } from 'lib/util';

export function rentUnitListAdapter(rentUnitList) {
    return (
        rentUnitList && rentUnitList.map(rentUnit => (
            {
                apartmentName: rentUnit.apartmentName,
                area: rentUnit.area,
                address: isValidValue(rentUnit.subwayLine)
                    && isValidValue(rentUnit.subwayStation)
                    && isValidValue(rentUnit.subwayDistance)
                    ? `距离${rentUnit.subwayLine}${rentUnit.subwayStation}${rentUnit.subwayDistance}米`
                    : '',
                tags: rentUnit.tags,
                imgUrl: rentUnit.image,
                floor: rentUnit.floor,
                totalFloor: rentUnit.totalFloor,
                rentalType: rentUnit.rentalType,
                blockName: rentUnit.blockName,
                bedroomCount: rentUnit.bedroomCount,
                direct: rentUnit.direct,
                price: rentUnit.price,
                rentUnitId: rentUnit.rentUnitId,
                aptType: rentUnit.aptType,
            }
        ))
    ) || [];
}
