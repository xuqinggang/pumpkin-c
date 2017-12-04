import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import Scroll from 'Shared/Scroll/Scroll';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-roomslider';

class RoomSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            sliderImgArr: [
                {
                    text: '01卧',
                    img: 'http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1',
                },
                {
                    text: '02卧',
                    img: 'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg',
                },
                {
                    text: '03卧',
                    img: 'http://img.zcool.cn/community/01690955496f930000019ae92f3a4e.jpg@2o.jpg',
                },
                {
                    text: '05卧',
                    img: 'http://img.zcool.cn/community/014a52554064690000005b03d35d4e.jpg@900w_1l_2o_100sh.jpg',
                },
                {
                    text: '06卧',
                    img: 'http://www.taopic.com/uploads/allimg/140107/234764-14010F0310582.jpg',
                },
                {
                    text: '08卧',
                    img: 'http://pic.58pic.com/58pic/13/76/61/33N58PICRdp_1024.jpg',
                },
                {
                    text: '10卧',
                    img: 'http://img.zcool.cn/community/01080755c1edaf32f87528a18e9840.jpg@900w_1l_2o_100sh.jpg',
                },
                {
                    text: '011卧',
                    img: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
                },
                // {
                //     text: '012卧',
                //     img: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
                // },
                // {
                //     text: '013卧',
                //     img: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
                // },
                // {
                //     text: '014卧',
                //     img: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
                // },
            ],
        };
        this.onSliderChange = this.onSliderChange.bind(this);
        this.handleTextTap = this.handleTextTap.bind(this);
    }
    renderSliderImg() {
        const sliderImgArr = this.state.sliderImgArr || [];
        return sliderImgArr.map((imgInfo, index) => {
            return (
                <div key={index} className={`${classPrefix}-item-img`}>
                    <img 
                        className={`${classPrefix}-img`}
                        src={imgInfo.img} 
                        alt=""
                    />
                </div>
            );
        });
    }
    renderSliderText() {
        const sliderImgArr = this.state.sliderImgArr || [];
        return sliderImgArr.map((imgInfo, index) => {
            const itemClass = classnames(`${classPrefix}-item-text`, {
                'text-active': this.state.activeIndex === index,
            });
            return (
                <div
                    key={index}
                    className={itemClass}
                    onTouchTap={this.handleTextTap.bind(this, index)}
                >
                    <span className={`${classPrefix}-text`}>{imgInfo.text}</span>
                </div>
            );
        });
    }
    handleTextTap(index) {
        this.setState({
            activeIndex: index,
        });
        this.reactswipe.slide(index, 300);

    }
    onSliderChange(index, ele) {
        this.setState({
            activeIndex: index,
        });
        console.log('index', index, ele)
    }
    render() {
        console.log('RoomSlider render');
        const { activeIndex } = this.state;
        return (
            <div className={classPrefix}>
                {
                    <ReactSwipe 
                        ref={reactswipe => this.reactswipe = reactswipe} 
                        className="carousel" 
                        swipeOptions={{ continuous: false, callback: this.onSliderChange }}
                    >
                        {
                            this.renderSliderImg()
                        }
                    </ReactSwipe>
                    // <div>
                    //     <ul className={`${classPrefix}-list-text`}>
                    // {
                    //     this.renderSliderText()
                    // }
                    // </ul>
                    // </div>
                }
                <Scroll activeIndex={this.state.activeIndex}>
                    {
                        this.renderSliderText()
                    }
                </Scroll>
            </div>
        );
    }
}

export default RoomSlider;
