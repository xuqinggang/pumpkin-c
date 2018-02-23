import React, { PureComponent } from 'react';
import ApartmentItem from '../ApartmentItem';

import './styles.less';

export default class PureApartmentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div>
                <ApartmentItem />
                <ApartmentItem />
            </div>
        );
    }
}
