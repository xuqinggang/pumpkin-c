import React, { Component } from 'react';
import classnames from 'classnames';
import ReactSwipe from 'react-swipe';
import Scroll from 'Shared/Scroll/Scroll';

import FURNITUREMAPICON from './furnitureMapIcon';

import './styles.less';

const roomKeyMapName = {
    publicFurniture: '公共空间',
    bedrooms: '卧',
    livingRooms: '客厅',
};

const classSliderPrefix = 'm-sliderfurniture';
const classScrollPrefix = 'm-scrollfurniture';

const furniture = {
    publicFurniture: [
        {
            furniture: ["BED", "WARDROBE", "BED", "WARDROBE", "BED", "WARDROBE", "BED", "WARDROBE"],
        },
    ],
    bedrooms: [
        {
            number: 1,
            furniture: ["BED", "WARDROBE"],
        },
        {
            number: 2,
            furniture: ["BED", "WARDROBE"],
        },
    ],
    livingRooms: [
        {
            number: 1,
            furniture: ["BED", "WARDROBE"],
        },
        {
            number: 1,
            furniture: ["BED", "WARDROBE"],
        },
    ],
};

export default class HouseFurniture extends Component {
    static initGeneFurnitureData(furniture) {
        const scrollList = [];
        const sliderList = [];
        Object.keys(furniture).map((roomKey, index) => {
            const roomsFurniture = furniture[roomKey];

            roomsFurniture && roomsFurniture.map((roomFurnitureItem, index) => {
                // 生成滑动列表元素
                let roomName = roomKeyMapName[roomKey];
                if (roomName) {
                    if (roomFurnitureItem.number) {
                        roomName = `0${roomFurnitureItem.number}${roomName}`;
                    }
                    scrollList.push(roomName);
                }

                sliderList.push(roomFurnitureItem.furniture);
            });
        });

        return {
            scrollList,
            sliderList,
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };

        const { scrollList, sliderList } = HouseFurniture.initGeneFurnitureData(furniture);
        this.scrollList = scrollList;
        this.sliderList = sliderList;
    }


    // 渲染家具swipe
    renderMultiSliderFurniture(furniture) {
        const slideFurnitureList = this.sliderList && this.sliderList.map((furnitureArr, index) => {
            return <SlideFurniture key={index} furniture={furnitureArr} />
        });

        if (slideFurnitureList && slideFurnitureList.length) {
            return (
                <ReactSwipe
                    className="carousel" 
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
        console.log('scrollList', this.scrollList)
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
                    <Scroll activeIndex={activeIndex}>
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
        this.setState({
            activeIndex: index,
        });
    }

    render() {

        const swipeChildren = this.renderMultiSliderFurniture(furniture);
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

function SlideFurniture(props) {
    const { furniture } = props;
    console.log('SlideFurniture', furniture);
    const furnitureList = furniture && furniture.map((item, index) => {
        const furnitureItem = FURNITUREMAPICON[item];
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
