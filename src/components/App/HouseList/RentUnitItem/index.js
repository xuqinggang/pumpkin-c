import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import { goHouseDetail } from 'application/App/routes/routes';
import { rentUnitShape } from 'baseData/propTypes';
import { RentalTypeMapText, DirectTypeMapText } from 'baseData/MapData';
import { ModListImgUrl } from 'baseData/modUrlForCropImage';
import { getWithDefault } from 'lib/util';
import './style.less';
import { isRmHead, isNanguaApp } from 'lib/const';

const isLikeNativeView = () => isRmHead() && isNanguaApp();

const itemClassPrefix = 'm-houseitem';

class RentUnitItem extends PureComponent {
    constructor(props) {
        super(props);
        // window.isServerRender 标识是服务器端渲染
        this.state = {
            imgLoading: window.isServerRender ? false : true,
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleImageLoad() {
        this.setState({
            imgLoading: false,
        });
    }

    handleTouchTap() {
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
        const imgClsPrefix = `${itemClassPrefix}-img`;
        const imgCls = classNames(imgClsPrefix, {
            [`${imgClsPrefix}__loading`]: this.state.imgLoading,
        });

        return (
            <div
                onTouchTap={this.handleTouchTap}
                className={`${itemClassPrefix} g-grid-row f-flex-justify-start`}
            >
                <div className={`${itemClassPrefix}-img-wrap`}>
                    <img
                        className={imgCls}
                        src={ModListImgUrl(imgUrl)}
                        alt="房源图片"
                        onLoad={this.handleImageLoad}
                    />
                    {
                        aptType === 'CENTRALIZED' ?
                            <span className={`${itemClassPrefix}-apttype`}>集中式</span> :
                        null
                    }
                </div>
                <ul className={`${itemClassPrefix}-intro g-grid-col f-flex-justify-between`}>
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
                                <i className={`${itemClassPrefix}--gap`}>/</i>
                                <span className="f-display-inlineblock tags-item">
                                    {area}㎡
                                </span>
                                <i className={`${itemClassPrefix}--gap`}>/</i>
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
                                >{tag}</span>
                            ))
                        }
                    </li>
                </ul>
            </div>
        );
    }
}

RentUnitItem.propTypes = rentUnitShape.isRequired;

export default withRouter(RentUnitItem);
