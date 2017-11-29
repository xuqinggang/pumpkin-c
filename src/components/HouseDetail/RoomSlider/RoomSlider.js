import React, { Component } from 'react';
import classnames from 'classnames';
import './styles.less';

const classPrefix = 'm-roomslider';

class RoomSlider extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={classPrefix}>
                RoomSlider
            </div>
        )
    }
}

export default RoomSlider;
