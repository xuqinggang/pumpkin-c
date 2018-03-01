import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const classPrefix = 'm-apartmenthouselist';

export default class ApartmentHouseList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { centralHouses } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <p>房型列表</p>

            </div>
        );
    }
}

ApartmentHouseList.propTypes = {
    centralHouses: PropTypes.array, // TODO
};

ApartmentHouseList.defaultProps = {
    centralHouses: [],
};

