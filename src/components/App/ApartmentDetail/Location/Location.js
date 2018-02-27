import React, { PureComponent } from 'react';

const classPrefix = 'm-apartmentlocation';

export default class Location extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>地址</p>
            </div>
        );
    }
}
