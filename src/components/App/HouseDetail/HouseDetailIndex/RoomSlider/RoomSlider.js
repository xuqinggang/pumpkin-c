import React, { PureComponent } from 'react';
import ReactSwipe from 'react-swipe';
import Scroll from 'Shared/Scroll/Scroll';
import classnames from 'classnames';
import { ApartmentType } from 'baseData/MapData';

import './styles.less';

const classPrefix = 'm-roomslider';
const imgCutModifier = '?crop=1&cpos=middle&w=750&h=388';

class RoomSlider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 当前轮播图底部文字的索引,一个tab文字，可能对应多张图片
            activeIndex: 0,
            // sliderImgArr: [
            //     {
            //         text: '01卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1',
            //                 activeIndex: 0,
            //             },
            //             {
            //                 img: 'http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1',
            //                 activeIndex: 0,
            //             },
            //         ],
            //         aboveImgLength: 0,
            //     },
            //     {
            //         text: '02卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg',
            //                 activeIndex: 1,
            //             },
            //         ],
            //         aboveImgLength: 2,
            //     },
            //     {
            //         text: '03卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
            //                 activeIndex: 2,
            //             },
            //             {
            //                 img: 'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg',
            //                 activeIndex: 2,
            //             }

            //         ],
            //         aboveImgLength: 3,
            //     },
            //     {
            //         text: '04卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://img.zcool.cn/community/014a52554064690000005b03d35d4e.jpg@900w_1l_2o_100sh.jpg',
            //                 activeIndex: 3,
            //             },
            //             {
            //                 img: 'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg',
            //                 activeIndex: 3,
            //             }

            //         ],
            //         aboveImgLength: 5,
            //     },
            //     {
            //         text: '05卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://www.taopic.com/uploads/allimg/140107/234764-14010F0310582.jpg',
            //                 activeIndex: 4,
            //             },
            //         ],
            //         aboveImgLength: 7,
            //     },
            //     {
            //         text: '06卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://www.taopic.com/uploads/allimg/140107/234764-14010F0310582.jpg',
            //                 activeIndex: 5,
            //             },
            //             {
            //                 img: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
            //                 activeIndex: 5,
            //             },
            //         ],
            //         aboveImgLength: 8,
            //     },
            //     {
            //         text: '07卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://www.taopic.com/uploads/allimg/140107/234764-14010F0310582.jpg',
            //                 activeIndex: 6,
            //             },
            //         ],
            //         aboveImgLength: 10,
            //     },
            //     {
            //         text: '08卧',
            //         imgInfo: [
            //             {
            //                 img: 'http://www.taopic.com/uploads/allimg/140107/234764-14010F0310582.jpg',
            //                 activeIndex: 7,
            //             },
            //             {
            //                 img: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
            //                 activeIndex: 7,
            //             },
            //         ],
            //         aboveImgLength: 12,
            //     },
            // ],
        };
    }

    // 事件处理程序-轮播图底部tab文字touchTap
    handleTextTap = (index, e) => {
        // 阻止冒泡
        e.preventDefault();
        const { sliderImgArr } = this.props;
        const { activeIndex } = this.state;
        if (index !== activeIndex) {
            this.setState({
                activeIndex: index,
            });

            this.reactswipe.slide(sliderImgArr[index].aboveImgLength, 300);
        }
    }

    // 回调函数-轮播图滑动
    onSliderChange = (index, ele) => {
        // console.log('RoomSlider onSliderChange')
        const { activeIndex } = this.state;
        const activeIndexAttr = parseInt(ele.getAttribute('data-activeindex'));

        if (activeIndexAttr !== activeIndex) {
            this.setState({
                activeIndex: activeIndexAttr,
            });
        }
    }

    renderSliderImg(sliderImgArr) {
        const sliderImgChildren = [];
        sliderImgArr && sliderImgArr.forEach((sliderImgItem, firstIndex) => {
            const imgInfo = sliderImgItem.imgInfo;
            if (imgInfo && imgInfo.length) {
                imgInfo.forEach((imgItem, secondIndex) => {
                    sliderImgChildren.push(
                        <div
                            key={`${firstIndex}${secondIndex}`}
                            className={`${classPrefix}-item-img`}
                            data-activeindex={imgItem.activeIndex}
                        >
                            <img 
                                className="img"
                                src={imgItem.img + imgCutModifier} 
                                alt=""
                            />
                        </div>
                    );
                });
            }
        });

        return sliderImgChildren;
    }

    renderSliderText(sliderImgArr) {
        // const sliderImgArr = this.state.sliderImgArr || [];
        return sliderImgArr && sliderImgArr.map((imgInfo, index) => {
            const itemClass = classnames(`${classPrefix}-item-text`, {
                'text-active': this.state.activeIndex === index,
            });

            return (
                <div
                    key={index}
                    className={itemClass}
                    onTouchTap={this.handleTextTap.bind(this, index)}
                >
                    <span className="f-display-inlineblock text">{imgInfo.text}</span>
                </div>
            );
        });
    }
    
    render() {
        const { activeIndex } = this.state;
        const { sliderImgArr, aptType, onsaleCount } = this.props;

        return (
            <div className={classPrefix}>
                <ReactSwipe
                    key={sliderImgArr.length}
                    className={`${classPrefix}-list-slider`}
                    ref={reactswipe => this.reactswipe = reactswipe} 
                    swipeOptions={{ continuous: false, callback: this.onSliderChange }}
                >
                    {
                        this.renderSliderImg(sliderImgArr)
                    }
                </ReactSwipe>
                {
                    aptType === ApartmentType.CENTRALIZED && onsaleCount > 0 ?
                    <span className="tip">剩余{onsaleCount}套可租</span> :
                    null
                }
                <div className={`${classPrefix}-list-text`}>
                    <Scroll
                        activeIndex={this.state.activeIndex}
                        key={sliderImgArr.length}
                    >
                        {
                            this.renderSliderText(sliderImgArr)
                        }
                    </Scroll>
                </div>
            </div>
        );
    }
}

export default RoomSlider;
