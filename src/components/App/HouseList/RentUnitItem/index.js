import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import { rentUnitShape } from 'baseData/propTypes';
import { RentalTypeMapText, DirectTypeMapText } from 'baseData/MapData';
import { ModListImgUrl } from 'baseData/modUrlForCropImage';
import { urlJoin } from 'lib/util';
import { kzPv } from 'lib/pv';
import './style.less';

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
        console.log('handleImageLoad');
        this.setState({
            imgLoading: false,
        });
    }

    handleTouchTap() {
        const urlPrefix = window.getStore('url').urlPrefix;
        this.props.history.push(urlJoin(urlPrefix, `detail/${this.props.rentUnitId}`));

        const urlStore = window.getStore('url');
        if (urlStore && urlStore.urlParamsObj && urlStore.urlParamsObj.daili) {
            kzPv(urlStore.urlParamsObj.daili, 'nangua_daili_detail');
        }
        // 每次进入详情页，发送一次pv请求
        window.send_stat_pv && window.send_stat_pv();
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
