import React, { PureComponent } from 'react';

const classPrefix = 'm-apartmenthouselist';

export default class ApartmentHouseList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>房型列表</p>
            </div>
        );
    }
}
