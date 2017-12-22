import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { rentUnitShape } from 'base/propTypes';
import { rentalTypeMap, directMap } from 'base/infoMap';
import defaultImage from './images/nangua.png';
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
            [`${imgClsPrefix}__loading`]: this.state.loading,
        });
        return (
            <div
                onTouchTap={this.handleTouchTap}
                className={`${itemClassPrefix} g-grid-row f-flex-justify-start`}
            >
                <div className={`${itemClassPrefix}-img-wrap`}>
                    <img
                        className={imgCls}
                        src={imgUrl || defaultImage}
                        alt="房源图片"
                        onLoad={this.handleImageLoad}
                    />
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
            </div>
        );
    }
}

RentUnitItem.propTypes = rentUnitShape.isRequired;

export default withRouter(RentUnitItem);