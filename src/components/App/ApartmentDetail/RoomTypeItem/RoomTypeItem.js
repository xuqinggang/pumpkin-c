import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ModListImgUrl } from 'baseData/modUrlForCropImage';
import { getTitle, getFloors, getDirect } from './formatData';

import './styles.less';

const classPrefix = 'm-roomtypeitem';

export default class RoomTypeItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imgLoading: true,
        };
    }

    render() {
        const { house } = this.props;
        const {
            bedroomCount,
            livingRoomCount,
            name,
            area,
            direct,
            floor,
            totalFloor,
            price,
            onsaleCount,

            imgUrl,
        } = house;
        const imgClsPrefix = `${classPrefix}-img`;
        const imgCls = classNames(imgClsPrefix, {
            [`${imgClsPrefix}__loading`]: this.state.imgLoading,
        });
        return (
            <div
                onTouchTap={this.handleTouchTap}
                className={`${classPrefix} g-grid-row f-flex-justify-start`}
            >
                <div className={`${classPrefix}-img-wrap`}>
                    <img
                        className={imgCls}
                        src={ModListImgUrl(imgUrl)}
                        alt="房源图片"
                        onLoad={this.handleImageLoad}
                    />
                </div>
                <ul className={`${classPrefix}-intro g-grid-col f-flex-justify-between`}>
                    <li className="intro-title" >
                        {getTitle(bedroomCount, livingRoomCount, name)}
                    </li>
                    <ul className="intro-brief g-grid-row f-flex-justify-between">
                        <li>
                            <div className="intro-tags">
                                <span className="f-display-inlineblock tags-item">
                                    {area}㎡
                                </span>
                                <span className="f-display-inlineblock tags-item">
                                    {getFloors(floor, totalFloor)}
                                </span>
                                <span className="f-display-inlineblock tags-item">
                                    {getDirect(direct)}
                                </span>
                            </div>
                        </li>
                        <li className="intro-price">
                            <span className="intro-price-wrap">
                                <span>¥</span>
                                <span className="intro-price-value">{price}</span>
                            </span>
                            <span>/月</span>
                        </li>
                    </ul>
                    <li>剩余{onsaleCount}套</li>
                </ul>
            </div>
        );
    }
}

RoomTypeItem.propTypes = {
    house: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        blockName: PropTypes.string,
        address: PropTypes.string,
        minPrice: PropTypes.number,
        maxPrice: PropTypes.number,
        totalOnsaleCount: PropTypes.number, // 可出租个数
        houseCount: PropTypes.number, // 房型个数
        headImage: PropTypes.string,
    }),
};

RoomTypeItem.defaultProps = {
    house: [],
};

