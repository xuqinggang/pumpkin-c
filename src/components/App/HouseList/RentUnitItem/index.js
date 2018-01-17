import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { rentUnitShape } from 'base/propTypes';
import { RentalTypeMapText, DirectTypeMapText } from 'base/MapData';
import { ModListImgUrl } from 'base/modUrlForCropImage';
import './style.less';

const itemClassPrefix = 'm-houseitem';

class RentUnitItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgLoading: true,
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
        // 记录从列表页进入到详情页，滚动条的位置
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        window.setStore('scrollTop', { pt: scrollTop });

        const cityName = this.props.match.params.cityName;
        this.props.history.push(`/${cityName}/nangua/detail/${this.props.rentUnitId}`);
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
                </div>
                <ul className={`${itemClassPrefix}-intro g-grid-col f-flex-justify-between`}>
                    <li className="intro-title" >
                        {blockName}-{bedroomCount}居室-{DirectTypeMapText[direct]}
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
                                    {floor}/{totalFloor}层
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
