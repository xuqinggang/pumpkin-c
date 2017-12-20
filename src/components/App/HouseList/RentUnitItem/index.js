import React from 'react';
import { rentUnitShape } from 'base/propTypes';
import { rentalTypeMap, directMap } from 'base/infoMap';
import defaultImage from './images/nangua.png';
import './style.less';

const itemClassPrefix = 'm-houseitem';

function RentUnitItem(
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
                <img className={`${itemClassPrefix}-img`} src={imgUrl || defaultImage} alt="房源图片" />
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

RentUnitItem.propTypes = rentUnitShape.isRequired;

export default RentUnitItem;
