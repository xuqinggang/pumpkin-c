import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';

import './styles.less';

const classPrefix = 'm-shoproomslider';
const imgCutModifier = '?crop=1&cpos=middle&w=750&h=388';

export default class RoomSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curIndex: 0,
        };
    }

    handleSlideChange = (curIndex) => {
        // FIX react-swipe Bug
        // when images length is 2, curIndex may be 0, 1, 2, 3
        const { images } = this.props;
        const len = images.length;
        let index;

        if (curIndex >= len) {
            index = curIndex % len;
        } else {
            index = curIndex;
        }
        this.setState({
            curIndex: index,
        })
    }

    render() {
        const { images, totalOnsaleCount } = this.props;
        const { curIndex } = this.state;

        if ((images && images.length <= 0) || !images) return null;

        return (
            <div className={`${classPrefix}`}>
                <ReactSwipe
                    className={`${classPrefix}-images`}
                    swipeOptions={{
                        // continuous: true, 
                        callback: this.handleSlideChange,
                        auto: 2000,
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
                {
                    totalOnsaleCount > 0
                        ? <span className="tip">剩余{totalOnsaleCount}套可租</span> 
                        : null
                }
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
    totalOnsaleCount: PropTypes.number,
};

RoomSlider.defaultProps = {
    images: [],
    totalOnsaleCount: 0,
};
