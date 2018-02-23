import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-apartmentitem';

export default class ApartmentItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    } 

    render() {
        return (
            <div>
                <p>一个公寓</p>
            </div>
        );
    }
}
