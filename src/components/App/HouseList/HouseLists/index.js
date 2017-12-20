import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rentUnitShape } from 'base/propTypes';
import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';
import './styles.less';

const clsPrefix = 'm-houselists';

export default class HouseLists extends Component {
    render() {
        return (
            <div className={clsPrefix}>
                {
                    this.props.singnalLess
                    ? <SingnalLessNote />
                    : null
                }
                {
                    ((!this.props.singnalLess && this.props.rentUnitList.list.length > 0)
                    || this.props.rentUnitList.loading)
                    ? <RentUnitList {...this.props.rentUnitList} />
                    : <RentUnitsSuggest {...this.props.suggestRentUnitList} />
                }
            </div>
        );
    }
}

HouseLists.propTypes = {
    rentUnitList: PropTypes.shape({
        onLoadMore: PropTypes.func,
        loading: PropTypes.bool,
        list: PropTypes.arrayOf(rentUnitShape),
    }),
    suggestRentUnitList: PropTypes.shape({
        list: PropTypes.arrayOf(rentUnitShape),
    }),
    singnalLess: PropTypes.bool,
};

HouseLists.defaultProps = {
    rentUnitList: {
        onLoadMore: () => {},
        loading: false,
        list: [],
    },
    suggestRentUnitList: {
        list: [],
    },
    singnalLess: false,
};
