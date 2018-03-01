import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RoomTypeItem from '../RoomTypeItem/RoomTypeItem';

const classPrefix = 'm-roomtypelist';

export default class RoomTypeList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { centralHouses } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <p>房型列表</p>
                {
                    centralHouses.map((house, index) => (
                        <RoomTypeItem house={house} key={index} />
                    ))
                }
            </div>
        );
    }
}

RoomTypeList.propTypes = {
    centralHouses: PropTypes.arrayOf(RoomTypeItem.propTypes),
};

RoomTypeList.defaultProps = {
    centralHouses: [],
};

