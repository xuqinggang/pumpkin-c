/* @flow */

import React, { PureComponent } from 'react';

import ImagePlaceHolder from 'Shared/ImagePlaceHolder/ImagePlaceHolder';
import { goHouseDetail } from 'application/App/routes/routes';
import { rentUnitShape } from 'baseData/propTypes';
import { RentalTypeMapText, DirectTypeMapText } from 'baseData/MapData';
import { getWithDefault } from 'lib/util';
import { clipImgUrl } from 'lib/helper';
import { isRmHead, isNanguaApp } from 'lib/const';
import placeholder from 'images/nangua.png';

import './style.less';

const isLikeNativeView = () => isRmHead() && isNanguaApp();

const classPrefix = 'm-rentunititem';

export default class RentUnitItem extends PureComponent<rentUnitItemType> {
    handleTouchTap = () => {
        // 南瓜租房 iOS 端打开, 模拟成原生页时打开原生详情页
        if (isLikeNativeView()) {
            window.location.href = `nangua://nanguazufang.cn?rentUnitId=${this.props.rentUnitId}`;
            return;
        }
        const {
            history,
            rentUnitId,
        } = this.props;
        goHouseDetail(history)(rentUnitId);
    }

    render() {
        const {
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
            aptType,
            apartmentName,
        } = this.props;

        return (
            <div
                onTouchTap={this.handleTouchTap}
                className={`${classPrefix} g-grid-row f-flex-justify-start`}
            >
                <div className={`${classPrefix}-img-wrap`}>
                    <ImagePlaceHolder
                        src={clipImgUrl(imgUrl)}
                        placeholder={placeholder}
                    />
                    {
                        aptType === 'CENTRALIZED' ?
                            <span className="apttype">集中式</span>
                            : null
                    }
                </div>
                <ul className={`${classPrefix}-intro g-grid-col f-flex-justify-between`}>
                    <li className="intro-title" >
                        <span className="title-apart f-vertical-middle">{apartmentName}</span>
                        {blockName}-{bedroomCount}居室-{getWithDefault(DirectTypeMapText, direct, '多个朝向')}
                    </li>
                    <ul className="intro-brief g-grid-row f-flex-justify-between">
                        <li>
                            <div className="intro-tags">
                                <span
                                    className="f-display-inlineblock tags-item"
                                >
                                    {RentalTypeMapText[rentalType]}
                                </span>
                                <i className={`${classPrefix}--gap`}>/</i>
                                <span className="f-display-inlineblock tags-item">
                                    {area}㎡
                                </span>
                                <i className={`${classPrefix}--gap`}>/</i>
                                <span className="f-display-inlineblock tags-item">
                                    {floor ? `${floor}/` : ''}{totalFloor}层
                                </span>
                            </div>
                            <div className="f-display-inlineblock intro-pt">{address}</div>
                        </li>
                        <li className="intro-price">
                            <span className="intro-price-wrap">
                                <span>¥</span>
                                <span className="intro-price-value">{price}</span>
                            </span>
                            <span>/月</span>
                        </li>
                    </ul>
                    <li>
                        {
                            tags.map(tag => (
                                <span
                                    key={tag}
                                    className="u-houselist-tag-round"
                                >
                                    {tag}
                                </span>
                            ))
                        }
                    </li>
                </ul>
            </div>
        );
    }
}
