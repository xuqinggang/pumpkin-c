import RentUnitItem from 'components/App/HouseList/RentUnitItem';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { rentUnitShape } from 'baseData/propTypes';
import TitleWithMore from '../TitleWithMore';

import './styles.less';

const clsPrefix = 'm-purerentUnit-list';

export default class RentUnitList extends PureComponent {
    render() {
        const { title, goMore } = this.props;
        return (
            <div className={clsPrefix}>
                <TitleWithMore title={title} goMore={goMore} />
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
    goMore: PropTypes.func,
};

RentUnitList.defaultProps = {
    list: [],
    title: '',
    goMore: () => null,
};
