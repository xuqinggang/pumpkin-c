import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import classnames from 'classnames';
import './styles.less';

const classPrefix = 'm-roomslider';

class RoomSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderImgArr: [
                {
                    text: '01卧室',
                    img: 'http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1',
                },
                {
                    text: '02卧室',
                    img: 'http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1',
                },
                {
                    text: '03卧室',
                    img: 'http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1',
                }
            ];
        }
    }
    renderSliderImg() {
        const sliderImgArr = this.state.sliderImgArr || [];
        sliderImgArr.map((imgInfo) => {
            return (
            )
        });
    }
    render() {
        return (
            <div className={classPrefix}>
                <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                    <ul>
                        <li>
                            <img 
                                src="http://pic1.58cdn.com.cn/anjuke_58/9b170cddcfabe731a9a99a6c2b0cdf48?w=640&h=480&crop=1" 
                                alt=""/>
                        </li>
                    </ul>
                </ReactSwipe>
            </div>
        )
    }
}

export default RoomSlider;
