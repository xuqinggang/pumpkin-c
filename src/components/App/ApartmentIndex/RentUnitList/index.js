import RentUnitItem from 'components/App/HouseList/RentUnitItem';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { rentUnitShape } from 'baseData/propTypes';

import './styles.less';

const clsPrefix = 'm-purerentUnit-list';

export default class RentUnitList extends PureComponent {
    render() {
        const { title, moreLink } = this.props;
        return (
            <div className={clsPrefix}>
                <div>
                    <span>{title}</span>
                    <a src={moreLink} alt={title} />
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

RentUnitList.propTypes = {
    list: PropTypes.arrayOf(rentUnitShape),
    title: PropTypes.string,
    moreLink: PropTypes.string,
};

RentUnitList.defaultProps = {
    list: [],
    title: '',
    moreLink: '',
};
