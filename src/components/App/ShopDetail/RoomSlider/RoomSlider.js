import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';

import ImagePreviewWrap from 'Shared/ImagePreviewWrap';
import { openIOSImageView } from 'lib/webviewBridge';
import { isLikeNativeView } from 'lib/const';

import videoImage from './video.png';

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

    linkNumber = 0;
    renderLinks = (link, index) => {
        const { avatar, url, bannerType } = link;
        if (url) {
            this.linkNumber = this.linkNumber + 1;
        }
        const linkNumberBefore = this.linkNumber;
        return (
            <div className={`${classPrefix}-item-img`} key={index}>
                {
                    bannerType === 'VIDEO' &&
                    <img className="video-image" src={videoImage} alt="视频" />
                }
                {
                    url ?
                        <a href={url}>
                            <img className="slider-img" src={avatar + imgCutModifier} alt="品牌公寓" key={index} />
                        </a>
                        : <img className="slider-img" onTouchTap={() => this.handleImageView(index - linkNumberBefore)} src={avatar + imgCutModifier} alt="品牌公寓" key={index} />
                }
            </div>
        );
    }

    handleTransitionEnd = (e) => {
        // console.log(e, 'handleTransitionEnd');
    }

    handleImageView = (index) => {        
        const { links, images } = this.props;
        let items;
        if (links.length) {
            // 去掉跳转链接
            items = links.filter(link => !link.url).map(link => link.avatar);
        } else {
            items = images;
        }

        if (isLikeNativeView()) {
            openIOSImageView(items, index);
        } else {
            ImagePreviewWrap({
                index,
                images: items,
            });
        }
    }

    renderImages = (img, index) => {
        return (
            <div onTouchTap={this.handleImageView} className={`${classPrefix}-item-img`} key={index}>
                <img className="slider-img" src={img + imgCutModifier} alt="品牌公寓" key={index} />
            </div>
        );
    }

    render() {
        const { images, totalOnsaleCount, links } = this.props;
        const { curIndex } = this.state;

        // if ((images && images.length <= 0) || !images) return null;
        const items = links.length > 0 ? links : images;

        // render 前都得设置为 0
        this.linkNumber = 0;

        return (
            <div className={`${classPrefix}`}>
                <ReactSwipe
                    className={`${classPrefix}-images`}
                    swipeOptions={{
                        // continuous: true,
                        callback: this.handleSlideChange,
                        auto: 2000,
                        transitionEnd: this.handleTransitionEnd,
                    }}
                    ref={swiper => this.swiper = swiper}
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
                        items && items.length > 1 && items.map((_, index) => (
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
