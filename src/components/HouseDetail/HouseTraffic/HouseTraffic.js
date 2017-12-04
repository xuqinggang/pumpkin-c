import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-housetraffic';

class HouseTraffic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className={`${classPrefix}`}>
                <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>周边及交通</h1>
                <div className={`${classPrefix}-intro`}>
                </div>
            </div>
        )
    }
}

export default HouseTraffic;
