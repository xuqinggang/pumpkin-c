
const stuffTotalFloorTOCentralHouses = (centralHouses, totalFloor) => {
    return centralHouses.map(house => (
        {
            ...house,
            totalFloor,
        }
    ));
};

const getLocation = (districtName, subwayName, stationName, distance) => {
    let location = districtName;

    if (subwayName && stationName && distance) {
        location = `${location} 距离${subwayName}${stationName}${distance}米`;
    }

    return location;
};

export default {
    stuffTotalFloorTOCentralHouses,
    getLocation,
};
