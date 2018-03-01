import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-noapartment';

export default class NoApartment extends PureComponent {
    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>啊哦，暂时没有相关门店呢</p>
            </div>
        );
    }
}
