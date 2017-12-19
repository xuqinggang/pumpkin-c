import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rentalUnitShape } from 'base/propTypes';
import { getDocHeight } from 'lib/util';
import { rentalTypeMap, directMap } from 'base/infoMap';
import './styles.less';

const listClassPrefix = 'm-houselists';
const itemClassPrefix = 'm-houseitem';

export default class HouseLists extends Component {
    componentDidMount() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const reserveSize = 50;
            const scrollTop = window.pageYOffset || window.screenY;
            if (scrollTop > lastScrollTop) {
                // 向下滚动
                if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                    this.props.onSrcollBottom();
                }
            }
            lastScrollTop = scrollTop;
        });
    }
    render() {
        return (
            <div className={`${listClassPrefix}`}>
                {
                    this.props.rentalUnitList.map((rentalUnit, index) => (
                        <HouseItem key={index} {...rentalUnit} />
                    ))
                }
                {
                    this.props.loading
                    ? <div>加载中...</div>
                    : null
                }
            </div>
        );
    }
}

HouseLists.propTypes = {
    rentalUnitList: PropTypes.arrayOf(rentalUnitShape),
    onSrcollBottom: PropTypes.func,
    loading: PropTypes.bool,
};

HouseLists.defaultProps = {
    rentalUnitList: [],
    onSrcollBottom: () => {},
    loading: false,
};

function HouseItem(
    {
        tags,
        imgUrl,
        floor,
        totalFloor,
        area,
        rentalType,
        address,
        blockName,
        bedroomCount,
        direct,
        price,
    }) {
    return (
        <a
            href=""
            className={`${itemClassPrefix} g-grid-row f-flex-justify-start`}
        >
            <div className={`${itemClassPrefix}-img-wrap`}>
                <img className={`${itemClassPrefix}-img`} src={imgUrl} alt="房源图片" />
            </div>
            <div className={`${itemClassPrefix}-intro g-grid-col f-flex-justify-between`}>
                <h1 className="intro-title" >
                    {blockName}-{bedroomCount}居室-{directMap[direct]}
                </h1>
                <div className="intro-brief g-grid-row f-flex-justify-between">
                    <div>
                        <div className="intro-tags">
                            <span
                                className="f-display-inlineblock tags-item"
                            >
                                {rentalTypeMap[rentalType]}
                            </span>
                            <span className="f-display-inlineblock tags-item">
                                {area}㎡
                            </span>
                            <span className="f-display-inlineblock tags-item">
                                {floor}/{totalFloor}层
                            </span>
                        </div>
                        <div className="f-display-inlineblock intro-pt">{address}</div>
                    </div>
                    <div className="intro-price">
                        <span className="intro-price-wrap">
                            <span>¥</span>
                            <span className="intro-price-value">{price}</span>
                        </span>
                        <span>/月</span>
                    </div>
                </div>
                <div>
                    {
                        tags.map(tag => (
                            <span
                                key={tag}
                                className="u-houselist-tag-round"
                            >{tag}</span>
                        ))
                    }
                </div>
            </div>
        </a>
    );
}

HouseItem.propTypes = rentalUnitShape;
