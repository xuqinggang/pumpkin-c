import React, { PureComponent } from 'react';
import classnames from 'classnames';
import ReactSwipe from 'react-swipe';
import Scroll from 'Shared/Scroll/Scroll';

import FurnitureMapIcon from './FurnitureMapIcon';

import './styles.less';

const roomKeyMapName = {
    publicFurniture: '公共空间',
    bedrooms: '卧',
    livingRooms: '客厅',
};

const classSliderPrefix = 'm-sliderfurniture';
const classScrollPrefix = 'm-scrollfurniture';

export default class HouseFurniture extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
    }

    initGeneFurnitureData(furnitureArr) {
        // const furnitureArr = [
        //     {
        //         text: '公共空间',
        //         furniture: ["BED", "WARDROBE", "BED", "WARDROBE", "BED", "WARDROBE", "BED", "WARDROBE"],
        //     },
        // ];

        if (this.scrollList && this.scrollList.length > 0) {
            return;
        }
        const scrollList = [];
        const sliderList = [];
        furnitureArr.forEach((furnitureItem) => {
            scrollList.push(furnitureItem.text);
            sliderList.push(furnitureItem.furniture);
        });
        this.scrollList = scrollList;
        this.sliderList = sliderList;
    }

    // 渲染家具swipe
    renderMultiSliderFurniture() {
        const slideFurnitureList = this.sliderList && this.sliderList.map((furnitureArr, index) => {
            return <SlideFurniture key={index} furniture={furnitureArr} />
        });

        if (slideFurnitureList && slideFurnitureList.length) {
            return (
                <ReactSwipe
                    key={slideFurnitureList.length}
                    className="carousel" 
                    ref={reactswipe => this.reactswipe = reactswipe} 
                    swipeOptions={{ continuous: false, callback: this.onSliderChange }}
                >
                    {slideFurnitureList}
                </ReactSwipe>
            );
        }

        return null;
    }

    // 渲染家具滚动slider
    // todo:optimize
    renderScrollFurniture() {
        const { activeIndex }  = this.state;
        const scrollFurnitureList =  this.scrollList && this.scrollList.map((item, index) => {
            const itemClass = classnames(`f-display-inlineblock ${classScrollPrefix}-item`, {
                'item-active': index === activeIndex,
            });

            return (
                <span
                    key={index}
                    className={itemClass}
                    onTouchTap={this.handleScrollTap.bind(this, index)}
                >
                    {item}
                </span>
            )
        });
    
        if (scrollFurnitureList && scrollFurnitureList.length) {
            return (
                <div className={`${classScrollPrefix}`}>
                    <Scroll 
                        key={scrollFurnitureList.length}
                        activeIndex={activeIndex}
                    >
                        {
                            scrollFurnitureList
                        }
                    </Scroll>
                </div>
            );
        }
 
        return null;
    }

    onSliderChange = (index) =>  {
        this.setState({
            activeIndex: index,
        });
    }

    handleScrollTap = (index) => {
        const { activeIndex } = this.state;
        if (index !== activeIndex) {
            this.setState({
                activeIndex: index,
            });
        }

        this.reactswipe.slide(index, 300);
    }

    render() {
        const { furnitureSliderArrData } = this.props;
        console.log('furnitureSliderArrData', furnitureSliderArrData)
        this.initGeneFurnitureData(furnitureSliderArrData);
        const swipeChildren = this.renderMultiSliderFurniture();
        const scrollChildren = this.renderScrollFurniture();

        return (
            <div>
                {
                    scrollChildren
                }
                {
                    swipeChildren 
                }
            </div>
        )

    }
}

// 家具slider面板
class SlideFurniture extends PureComponent {
    render() {
        const { furniture } = this.props;
        const furnitureList = furniture && furniture.map((item, index) => {
            const furnitureItem = FurnitureMapIcon[item];
            if (furnitureItem) {
                return (
                    <li key={index} className={`${classSliderPrefix}-item`}>
                        <span className={`f-display-block ${furnitureItem.className} ${classSliderPrefix}-icon`} />
                        <span className={`f-display-block ${classSliderPrefix}-text`}>
                            {furnitureItem.text}
                        </span>
                    </li>
                );
            }

            return null;
        });

        return (
            <div className={`${classSliderPrefix}`}>
                <ul className={`${classSliderPrefix}-list`}>
                    {furnitureList}
                </ul>
            </div>
        );
    }
}
