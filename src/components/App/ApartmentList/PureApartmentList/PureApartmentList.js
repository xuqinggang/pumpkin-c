import React, { PureComponent } from 'react';
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
                <p>集中式公寓列表</p>
            </div>
        );
    }
}
