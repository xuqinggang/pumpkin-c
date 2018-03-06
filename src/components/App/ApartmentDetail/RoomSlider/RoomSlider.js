import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';

import './styles.less';

const classPrefix = 'm-apartmentroomslider';
const imgCutModifier = '?crop=1&cpos=middle&w=750&h=388';

export default class RoomSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curIndex: 0,
        };
    }

    handleSlideChange = (curIndex) => {
        this.setState({
            curIndex,
        })
    }

    render() {
        const { images } = this.props;
        const { curIndex } = this.state;

        return (
            <div className={`${classPrefix}`}>
                <ReactSwipe
                    className={`${classPrefix}-images`}
                    swipeOptions={{
                        continuous: true, 
                        callback: this.handleSlideChange,
                        auto: 1000,
                    }}
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
                <div className={`${classPrefix}-bullet f-display-flex f-flex-justify-center`}>
                    {
                        images.map((_, index) => (
                            <div className={index === curIndex ? 'ring' : 'point'} key={index}></div>
                        ))
                    }
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
