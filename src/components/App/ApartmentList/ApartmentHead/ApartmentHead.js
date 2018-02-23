import React, { PureComponent } from 'react';
import './styles.less';

export default class ApartmentHead extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div>
                <p>集中式公寓头部</p>
            </div>
        );
    }
}
