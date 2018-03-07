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
        const { blockName, address } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <div
                    className={`f-singletext-ellipsis f-display-inlineblock ${classPrefix}-location`}
                    onTouchTap={this.props.onTouchTap}
                >
                    <span className={`icon-region`} />
                    <span>{address}</span>
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
    address: PropTypes.string,
    onTouchTap: PropTypes.func,
};

Location.defaultProps = {
    blockName: '',
    address: '',
    onTouchTap: () => null
};
