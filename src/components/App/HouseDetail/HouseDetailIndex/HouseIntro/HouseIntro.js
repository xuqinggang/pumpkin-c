import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ExpandText from 'Shared/ExpandText/ExpandText';
import { ApartmentType } from 'baseData/MapData';

const classPrefix = 'm-houseintro';

export default class HouseIntro extends PureComponent {
    render() {
        const {
            className,
            aptType = 'DISTRIBUTED',
            houseIntroStr,
        } = this.props;

        // houseIntroStr is falsy, no render
        if (!houseIntroStr) return null;

        return (
            <div className={`${classPrefix} ${className}`}>
                <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>
                    {aptType === ApartmentType.CENTRALIZED ? '房型介绍' : '房源介绍'}
                </h1>
                <ExpandText intro={houseIntroStr} />
            </div>
        )
    }
}

HouseIntro.defaultProps = {
    className: '',
    aptType: 'DISTRIBUTED',
    houseIntroStr: '',
};

HouseIntro.propTypes = {
    className: PropTypes.string,
    aptType: PropTypes.string,
    houseIntroStr: PropTypes.string,
};
