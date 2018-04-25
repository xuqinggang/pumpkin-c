
// 主要是合成离地铁的位置信息
export const formatRentunit = (rentUnit) => {
    const {
        subwayDistance,
        subwayLine,
        subwayStation,
    } = rentUnit;

    // compose address
    let address = null;
    if (subwayDistance && subwayLine && subwayStation) {
        address = `距离${subwayLine}${subwayStation}${subwayDistance}米`;
    }

    // remove apartmentName
    const apartmentName = null;

    return {
        ...rentUnit,
        address,
        apartmentName,
    };
};

export const x = 0;