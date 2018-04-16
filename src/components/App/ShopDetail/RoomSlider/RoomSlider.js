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
        const { links, images } = this.props;

        const items = links.length > 0 ? links : images;

        const len = items.length;
        let index;

        if (curIndex >= len) {
            index = curIndex % len;
        } else {
            index = curIndex;
        }
        this.setState({
            curIndex: index,
        });
    }

    renderLinks = (link, index) => {
        const { avatar, url } = link;
        return (
            <div className={`${classPrefix}-item-img`} key={index}>
                <a href={url}>
                    <img src={avatar + imgCutModifier} alt="品牌公寓" key={index} className="img" />
                </a>
            </div>
        );
    }

    renderImages = (img, index) => {
        return (
            <div className={`${classPrefix}-item-img`} key={index}>
                <img src={img + imgCutModifier} alt="品牌公寓" key={index} className="img" />
            </div>
        );
    }

    render() {
        const { images, totalOnsaleCount, links } = this.props;
        const { curIndex } = this.state;

        // if ((images && images.length <= 0) || !images) return null;
        const items = links.length > 0 ? links : images;

        return (
            <div className={`${classPrefix}`}>
                <ReactSwipe
                    className={`${classPrefix}-images`}
                    swipeOptions={{
                        // continuous: true,
                        callback: this.handleSlideChange,
                        auto: 2000,
                    }}
                    key={items.length}
                >
                    {
                        items.map((item, index) => (
                            links.length > 0
                                ? this.renderLinks(item, index)
                                : this.renderImages(item, index)
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
                        items.map((_, index) => (
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
    links: PropTypes.arrayOf({
        avatar: PropTypes.string,
        url: PropTypes.string,
    })
};

RoomSlider.defaultProps = {
    images: [],
    totalOnsaleCount: 0,
    links: [],
};
