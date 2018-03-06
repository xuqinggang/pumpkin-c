import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RoomTypeItem from '../RoomTypeItem/RoomTypeItem';

import './styles.less';

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
                <div className={`${classPrefix}-head`}>
                    <h1 className={`f-vertical-middle ${classPrefix}-title`}>房型列表</h1>
                </div>
                {
                    centralHouses.map((house, index) => (
                        <RoomTypeItem house={house} key={index} />
                    ))
                }
            </div>
        );
    }
}

// TODO
RoomTypeList.propTypes = {
    centralHouses: PropTypes.arrayOf(RoomTypeItem.propTypes.house),
};

RoomTypeList.defaultProps = {
    centralHouses: [],
};

