
// 主要是合成离地铁的位置信息
export const formatRentunit = (rentUnit) => {
    const {
        subwayDistance,
        subwayLine,
        subwayStation,
    } = rentUnit;
    if (!subwayDistance || !subwayLine || !subwayStation) {
        return rentUnit;
    }

    const address = `距离${subwayLine}${subwayStation}${subwayDistance}米`;

    return {
        ...rentUnit,
        address,
    };
};

export const x = 0;