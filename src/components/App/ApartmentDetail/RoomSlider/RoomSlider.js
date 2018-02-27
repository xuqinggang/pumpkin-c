import React, { PureComponent } from 'react';

const classPrefix = 'm-apartmentroomslider';

export default class RoomSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>图片</p>
            </div>
        );
    }
}
