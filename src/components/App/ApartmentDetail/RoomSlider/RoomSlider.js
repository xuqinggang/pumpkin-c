import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';

import './styles.less';

const classPrefix = 'm-apartmentroomslider';
const imgCutModifier = '?crop=1&cpos=middle&w=750&h=388';

export default class RoomSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { images } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <ReactSwipe
                    className={`${classPrefix}-images`}
                    swipeOptions={{continuous: false}}
                    key={images.length}              
                >
                    {
                        images.map((img, index) => (
                            <div className={`${classPrefix}-item-img`} key={index}>
                                <img src={img + imgCutModifier} alt="品牌公寓" key={index} className="img" />
                            </div>
                        ))
                    }
                </ReactSwipe>
                <div>
                    <div className={`point`}></div>
                    <div className={`ring`}></div>
                    <div className={`point`}></div>
                </div>
            </div>
        );
    }
}

RoomSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    // onsaleCount: PropTypes.number,
};

RoomSlider.defaultProps = {
    images: [],
    // onsaleCount: 0,
};
