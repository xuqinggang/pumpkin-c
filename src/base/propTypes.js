import PropTypes from 'prop-types';

export const rentUnitShape = PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string), // or oneOf
    imgUrl: PropTypes.string,
    floor: PropTypes.number,
    totalFloor: PropTypes.number,
    area: PropTypes.number,
    rentalType: PropTypes.string, // or oneOf..
    address: PropTypes.string,
    blockName: PropTypes.string,
    bedroomCount: PropTypes.number,
    direct: PropTypes.string,
    price: PropTypes.number,
});
