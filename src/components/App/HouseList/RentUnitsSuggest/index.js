import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rentUnitShape } from 'base/propTypes';
import RentUnitItem from '../RentUnitItem/index';
import './style.less';

const clsPrefix = 'm-rentUnits-suggest';

export default class RentUnitsSuggest extends Component {
    render() {
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--note`}>
                    <i className={`${clsPrefix}--note-icon`} />
                    <div className={`${clsPrefix}--note-text`}>未找到对应房源，以下是推荐房源</div>
                </div>
                {
                    this.props.list.map((rentalUnit, index) => (
                        <RentUnitItem key={index} {...rentalUnit} />
                    ))
                }
            </div>
        );
    }
}

RentUnitsSuggest.propTypes = {
    list: PropTypes.arrayOf(rentUnitShape),
};

RentUnitsSuggest.defaultProps = {
    list: [],
};
