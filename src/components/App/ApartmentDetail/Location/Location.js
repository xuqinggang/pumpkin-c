import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-apartmentlocation';

export default class Location extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { blockName, location } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <div className={`f-singletext-ellipsis f-display-inlineblock ${classPrefix}-location`}>
                    <span className={`icon-region`} />
                    <span>{location}</span>
                </div>
                <div className={`f-display-inlineblock head-apartname-wrap`}>
                    <span className={`f-singletext-ellipsis head-apartname`}>{blockName}</span>
                </div>
            </div>
        );
    }
}

Location.propTypes = {
    blockName: PropTypes.string,
    location: PropTypes.string,
};

Location.defaultProps = {
    blockName: '',
    location: '昌平区立水桥东小口镇中滩村105号',
};
