import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'g-apartmentindex';

export default class ShopList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>品牌公寓</p>
            </div>
        );
    }
}
