import React, { PureComponent } from 'react';
import classnames from 'classnames';
// import PropTypes from 'prop-types';

import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';

import './styles.less';

const classPrefix = 'm-nearbyfilter';

const DISTANCES = [
    {
        text: '不限',
        value: '0',
    },
    {
        text: '1km',
        value: '1',
    },
    {
        text: '2km',
        value: '2',
    },
    {
        text: '3km',
        value: '3',
    },
];

class NearbyFilter extends PureComponent {
    handlePress = (distance) => {
        this.props.onFilterConfirm(distance);
    }

    render() {
        const { filterState } = this.props;

        return (
            <div className={`${classPrefix}`}>
                <ul>
                    {
                        DISTANCES.map(item => (
                            <li
                                className={item.value === filterState ? 'active' : ''}
                                onTouchTap={() => this.handlePress(item.value)}
                            >
                                {item.text}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

NearbyFilter.propTypes = {};

NearbyFilter.defaultProps = {};

export default FilterConfirmConnect(false)(NearbyFilter);
