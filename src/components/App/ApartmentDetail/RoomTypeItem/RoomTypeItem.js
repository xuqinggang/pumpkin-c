import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import { urlJoin } from 'lib/util';
import { ModListImgUrl } from 'baseData/modUrlForCropImage';
import { getTitle, getFloors, getDirect } from './formatData';

import './styles.less';

const classPrefix = 'm-roomtypeitem';

class RoomTypeItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imgLoading: true,
        };
    }

    handleTouchTap = () => {
        const { id } = this.props.house;
        const urlPrefix = window.getStore('url').urlPrefix;
        this.props.history.push(urlJoin(urlPrefix, `detail/${id}`));
    }

    handleImageLoad = () => {
        this.setState({
            imgLoading: false,
        })
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
            price,
            onsaleCount,
            totalFloor,
            headImage,
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
                        src={ModListImgUrl(headImage)}
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
                    <li className="onsale-count">剩余{onsaleCount}套</li>
                </ul>
            </div>
        );
    }
}

RoomTypeItem.propTypes = {
    house: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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


export default withRouter(RoomTypeItem);