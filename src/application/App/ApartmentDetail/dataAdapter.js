
const stuffTotalFloorTOCentralHouses = (centralHouses, totalFloor) => {
    return centralHouses.map(house => (
        {
            ...house,
            totalFloor,
        }
    ));
};

export default {
    stuffTotalFloorTOCentralHouses,
};
