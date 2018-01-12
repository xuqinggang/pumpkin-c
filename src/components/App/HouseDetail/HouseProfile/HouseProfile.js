import React, { Component } from 'react';
import classnames from 'classnames';

import BottomDialog from 'Shared/BottomDialog';
import Config from 'config/config';
import { PayTypeMapName } from 'base/MapData';

import './styles.less';

const classPrefix = 'm-houseprofile';
const payTypeClass = 'm-paytype';

export default function HouseProfile(props) {
    const { className, houseProfileData, houseTrafficData } = props;
    const { title, location } = houseProfileData;

    // 经纬度
    const { lon, lat } = houseTrafficData;
    const pos = `${lon},${lat}`;

    function handleJumpMapTap() {
        window.location.href = `${Config.urlPrefix}/map?pos=${pos}`;
    }
    
    return (
        <div className={`${classPrefix} ${className}`}>
            <HouseProfileHead
                houseProfileHeadData={houseProfileData.houseProfileHeadData || {}}
            />
            <h2 className={`${classPrefix}-title`}>{title}</h2>
            <div className={`${classPrefix}-location`} onTouchTap={handleJumpMapTap}>
                <span
                    className="f-display-inlineblock f-vertical-middle f-singletext-ellipsis location-text"
                >
                    {location}
                </span>
                <span className="f-display-inlineblock f-vertical-middle icon-next location-icon"></span>
            </div>
        </div>
    )
}

// houseProfile头部含有付款方式选择单独提取出来作为一个组件
class HouseProfileHead extends Component {
    constructor(props) {
        super(props);
        const { selectedPayType } = props.houseProfileHeadData;
        this.state = {
            selectedPayType,
            show: false,
        };
    }

    // 回调函数TouchTap-弹层付款方式
    onPayTypeTouchTap = (payType) => {
        this.setState({
            selectedPayType: payType,
            // 付款弹层是否展示
            show: false,
        });
    }

    // 事件处理程序TouchTap-选择付款方式
    handleSelectPayTypeTouchTap = () => {
        this.setState({
            show: true,
        });
    }

    componentWillReceiveProps(nextProps) {
        const selectedPayType = nextProps.houseProfileHeadData.selectedPayType;
        if (selectedPayType) {
            this.setState({
                selectedPayType,
            });
        }
    }

    render() {
        // selectedPayType: 选中付款方式
        // show: 付款弹层是否
        const { selectedPayType, show } = this.state;
        const { payTypeData, apartmentName } = this.props.houseProfileHeadData;
        // 当前选中的价钱
        const selectedPrice = payTypeData && payTypeData[selectedPayType] && payTypeData[selectedPayType].price;

        return (
            <div className={`${classPrefix}-head g-grid-row f-flex-justify-between f-flex-align-center`}>
                <div>
                    <h1 className="f-display-inlineblock f-vertical-middle head-price">￥{selectedPrice}/月</h1>
                    <span
                        className="f-display-inlineblock  f-vertical-middle head-paytype-wrap"
                        onTouchTap={this.handleSelectPayTypeTouchTap}
                    >
                        <span className="f-display-inlineblock f-vertical-middle head-paytype">
                            {PayTypeMapName[selectedPayType]}价
                        </span>
                        <span className="f-display-inlineblock f-vertical-middle icon-next head-icon"></span>
                    </span>
                </div>
                {
                    apartmentName ?
                        <div className="f-display-inlineblock head-apartname-wrap">
                            <span className="f-display-inlineblock f-singletext-ellipsis head-apartname">
                                {apartmentName}
                            </span>
                        </div>
                        : null
                }
                <PayTypeComp
                    show={show}
                    selectedPayType={selectedPayType}
                    onPayTypeTouchTap={this.onPayTypeTouchTap}
                    payTypeData={payTypeData}
                />
            </div>
        );
    }
}

// 付款方式弹层组件
function PayTypeComp(props) {
    const { show, selectedPayType, onPayTypeTouchTap, payTypeData } = props;

    if (!show) {
        return null;
    }
    
    function renderPayTypeBody() {
        return payTypeData && Object.keys(payTypeData).map((payTypeKey, index) => {
            if (!payTypeData[payTypeKey]) return null;

            return (
                <PayTypeItem
                    key={index} 
                    payData={payTypeData[payTypeKey]} 
                    payType={payTypeKey}
                    selectedPayType={selectedPayType}
                    onPayTypeTouchTap={onPayTypeTouchTap}
                />
            );
        });
    }

    return (
        <BottomDialog show={show} className={`${payTypeClass}`}>
            <BottomDialog.Header className={`${payTypeClass}-head`}>
                <ul className="g-grid-row f-flex-justify-between f-flex-align-center">
                    <li>
                        <span className="f-display-inlineblock f-vertical-middle head-title">
                            付款方式
                        </span>
                    </li>
                    <li>
                        <BottomDialog.CloseBtn className={`f-vertical-middle head-icon`} />
                    </li>
                </ul>
            </BottomDialog.Header>
            <BottomDialog.Body className={`${payTypeClass}-body`}>
                    { renderPayTypeBody() }
            </BottomDialog.Body>
        </BottomDialog>
    )
}

// 付款方式Item
function PayTypeItem(props) {
    const { payData, payType, selectedPayType, onPayTypeTouchTap } = props;

    // 事件处理程序-付款方式itemTouchTap
    function handlePayTypeTouchTap() {
        onPayTypeTouchTap(payType);
    }

    const itemClass = classnames(`f-clear-float ${payTypeClass}-item`, {
        'item-active': payType === selectedPayType,
    });

    return (
        <div
            className={itemClass}
            onTouchTap={handlePayTypeTouchTap}
        >
            <ul className="g-grid-row f-flex-justify-between">
                <li className="text">{PayTypeMapName[payType]}</li>
                <li className="price">¥{payData.price} / 月</li>
            </ul>
            <span className="deposit f-float-right f-display-inlineblock">押金：¥{payData.deposit}元</span>
        </div>
    )
}
