import React, { PureComponent } from 'react';
import ApartmentItem from '../ApartmentItem';

import './styles.less';

export default class BrandFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div>
                <p>品牌筛选</p>
            </div>
        );
    }
}
