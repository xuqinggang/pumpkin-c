import React, { PureComponent } from 'react';

import {
    ApartmentHead,
    ApartmentFilter,
    PureApartmentList,
} from 'components/App/ApartmentList';

import './styles.less';

export default class ApartmentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div>
                <p>集中式公寓</p>
                <ApartmentHead />
                <ApartmentFilter />
                <PureApartmentList />
            </div>
        );
    }
}
