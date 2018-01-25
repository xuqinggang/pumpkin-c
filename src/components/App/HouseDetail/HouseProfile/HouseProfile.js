import React, { PureComponent } from 'react';
import classnames from 'classnames';

import BottomDialog from 'Shared/BottomDialog';
import { PayTypeMapName } from 'base/MapData';

import './styles.less';

const classPrefix = 'm-houseprofile';
const payTypeClass = 'm-paytype';

export default class HouseProfile extends PureComponent {
    static handleJumpMapTap() {
        const urlInfo = window.getStore('url');
        const urlPrefix = urlInfo && urlInfo.urlPrefix;

        window.location.href = `${urlPrefix}/map?pos=${pos}`;
    }

    render() {
        const { className, houseProfileData, houseTrafficData } = this.props;
        const { title, location } = houseProfileData;

        // 经纬度
        const { lon, lat } = houseTrafficData;
        const pos = `${lon},${lat}`;

        return (
            <div className={`${classPrefix} ${className}`}>
                <HouseProfileHead
                    houseProfileHeadData={houseProfileData.houseProfileHeadData || {}}
                />
                <h2 className={`${classPrefix}-title`}>{title}</h2>
                <div className={`${classPrefix}-location`} onTouchTap={this.handleJumpMapTap}>
                    <span
                        className="f-display-inlineblock f-vertical-middle f-singletext-ellipsis location-text"
                    >
                        {location}
                    </span>
                    <span className="f-display-inlineblock f-vertical-middle icon-next location-icon"></span>
                </div>
            </div>
        );
    }
        
}

// houseProfile头部含有付款方式选择单独提取出来作为一个组件
class HouseProfileHead extends PureComponent {
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

    onCloseDialogTap = () => {
        this.setState({
            show: false,
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
                    onClose={this.onCloseDialogTap}
                    selectedPayType={selectedPayType}
                    onPayTypeTouchTap={this.onPayTypeTouchTap}
                    payTypeData={payTypeData}
                />
            </div>
        );
    }
}

// 付款方式弹层组件
class PayTypeComp extends PureComponent {
    renderPayTypeBody() {
        const { selectedPayType, onPayTypeTouchTap, payTypeData } = this.props;

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
    
    render() {
        const {
            show,
            onClose,
        } = this.props;

        if (!show) {
            return null;
        }


        return (
            <BottomDialog show={show} className={`${payTypeClass}`} onClose={onClose}>
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
                    { this.renderPayTypeBody() }
                </BottomDialog.Body>
            </BottomDialog>
        );
    }
        
}

// 付款方式Item
class PayTypeItem extends PureComponent {
    // 事件处理程序-付款方式itemTouchTap
    handlePayTypeTouchTap() {
        this.props.onPayTypeTouchTap(payType);
    }

    render() {
        const { payData, payType, selectedPayType } = this.props;

        const itemClass = classnames(`f-clear-float ${payTypeClass}-item`, {
            'item-active': payType === selectedPayType,
        });

        return (
            <div
                className={itemClass}
                onTouchTap={this.handlePayTypeTouchTap}
            >
                <ul className="g-grid-row f-flex-justify-between">
                    <li className="text">{PayTypeMapName[payType]}</li>
                    <li className="price">¥{payData.price} / 月</li>
                </ul>
                <span className="deposit f-float-right f-display-inlineblock">押金：¥{payData.deposit}元</span>
            </div>
        );
    }
        
}
