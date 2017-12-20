import React, { Component } from 'react';
import './style.less';

const clsPrefix = 'm-rentUnit-placeHolder';

export default class RentUnitPlaceHolder extends Component {
    render() {
        return (
            <div className={clsPrefix}>
                <i className={`${clsPrefix}--icon`} />
            </div>
        );
    }
}

