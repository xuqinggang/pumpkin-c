import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const classPrefix = 'm-roomtypeitem';

export default class RoomTypeItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { house } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <p>房型</p>
            </div>
        );
    }
}

RoomTypeItem.propTypes = {
    house: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        blockName: PropTypes.string,
        address: PropTypes.string,
        minPrice: PropTypes.number,
        maxPrice: PropTypes.number,
        totalOnsaleCount: PropTypes.number, // 可出租个数
        houseCount: PropTypes.number, // 房型个数
        headImage: PropTypes.string,
    }),
};

RoomTypeItem.defaultProps = {
    house: [],
};

