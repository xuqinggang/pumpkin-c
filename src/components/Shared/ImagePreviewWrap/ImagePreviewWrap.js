import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import 'photoswipe/dist/photoswipe.css';
import PhotoSwipe from 'photoswipe/dist/photoswipe.min';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.min';

import './styles.less';

const classPrefix = 'm-imagePreview';
// const imgCutModifier = '?crop=1&cpos=middle&w=750&h=388';

export default class ImagePreviewWrap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    show = () => {
        const { images, index } = this.props;

        const items = images.map((each) => {
            const eachSplit = each.split('//');
            let url;
            if (eachSplit.length <= 1) {
                url = each;
            } else {
                if (eachSplit[0] === 'http:' || eachSplit[0] === '') {
                    url = `https://${eachSplit[1]}`;
                } else {
                    url = each;
                }
            }
            return {
                src: url,
                w: 0,
                h: 0,
            };
        });
        const gallery = new PhotoSwipe(
            this.pswp,
            PhotoSwipeUI,
            items,
            {
                index,
                tapToClose: true,
                captionEl: true,
                fullscreenEl: false,
                zoomEl: false,
                shareEl: false,
                counterEl: true,
                arrowEl: true,
                preloaderEl: false,
            },
        );
        gallery.listen('gettingData', (index, item) => {
            if (item.w < 1 || item.h < 1) {
                const img = new Image();
                img.onload = () => {
                    item.w = img.width;
                    item.h = img.height;
                    gallery.invalidateCurrItems();
                    gallery.updateSize(true);
                };
                img.src = item.src;
            }
        });
        gallery.init();
    }

    render() {
        const { images } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <div className="pswp js-pswp" id="js-pswp" ref={pswp => this.pswp = pswp} tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="pswp__bg" />
                    <div className="pswp__scroll-wrap">
                        <div className="pswp__container">
                            <div className="pswp__item" />
                            <div className="pswp__item" />
                            <div className="pswp__item" />
                        </div>
                        <div className="pswp__ui pswp__ui--hidden">
                            <div className="pswp__top-bar">
                                <div className="pswp__counter" />
                                {/* <button className="pswp__button pswp__button--close" title="Close (Esc)" />
                                <button className="pswp__button pswp__button--share" title="Share" />
                                <button className="pswp__button pswp__button--fs" title="fullscreen" />
                                <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />
                                <div className="pswp__preloader">
                                    <div className="pswp__preloader__icn">
                                        <div className="pswp__preloader__cut">
                                            <div className="pswp__preloader__donut" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div className="pswp__share-tooltip" />
                            </div>
                            {/* <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />
                            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" /> */}
                            <div className="pswp__caption">
                                <div className="pswp__caption__center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ImagePreviewWrap.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    index: PropTypes.number,
};

ImagePreviewWrap.defaultProps = {
    images: [],
    index: 0,
};
