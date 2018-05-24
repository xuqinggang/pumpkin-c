import React, { PureComponent } from 'react';
// import classnames from 'classnames';

import BottomDialog from 'Shared/BottomDialog';
import headImg from 'components/App/HouseDetail/HouseDetailIndex/RoommateInfo/images/male.png';
import { isHasCookie } from 'lib/util';

import { ajaxDynamicTel } from 'application/App/HouseDetail/ajaxInitHouseDetail';
import { ajaxSaveTel } from 'application/App/HouseDetail/ajaxInitHouseDetail';
import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';
import {
    commentListStorage,
    commentQueueStorage,
    lastUserIdStorage,
} from 'application/App/storage';
import nanguaPv from 'lib/nanguaPv';

import './styles.less';

const btnPrefix = 'm-contactbutler-btn';
const dialogPrefix = 'm-contactbutler-dialog';

const savePhoneRecord = () => {
    const isLogin = isHasCookie('sid');
    if (!isLogin) {
        return;
    }

    const saveRecordRemote = () => {
        const phoneRecord = commentListStorage.get();
        // 无记录不用发送
        if (!phoneRecord || (phoneRecord && phoneRecord.length === 0)) return;
        ajaxSaveTel(phoneRecord).then(() => {
            commentListStorage.remove();
        });
    }

    const lastUserId = lastUserIdStorage.get();

    if (!lastUserId) {
        saveRecordRemote();
        return;
    }

    // 先从缓存中尝试获取 meInfo
    const meInfo = window.getStore('meInfo');
    if (meInfo && lastUserId === meInfo.uid) {
        saveRecordRemote();
        return;
    }

    // meInfo
    if (meInfo === null) {
        ajaxGetMeInfo()
            .then((meInfoObj) => {
                if (meInfo && lastUserId === meInfo.uid) {
                    window.setStore('meInfo', meInfoObj);
                    saveRecordRemote();
                }
            });
    }
};

const saveComment = (data) => {
    commentListStorage.push(data);
    commentQueueStorage.update(data);
    savePhoneRecord();
};

export default class ContactButler extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            dynamicTel: '',
        };
    }

    handleConcatTap = (e) => {
        const {
            id,
            tel,
            rentUnitId,
        } = this.props.contactButlerData;

        // nangua统计
        nanguaPv.pv({ rentUnitId, page: 'HOUSE_DETAIL', element: 'CONTACT_KEEPER', event: 'CLICK' });

        ajaxDynamicTel({ rentUnitId, supervisorId: id })
            .then((data) => {
                this.setState({
                    show: true,
                    dynamicTel: data.phoneNumber,
                });
            })
            .catch((err) => {
                this.setState({
                    show: true,
                    dynamicTel: tel,
                });
            });
    }

    handleNoContactTap = (e) => {
        this.onCloseDialogTap();
    }

    onCloseDialogTap = () => {
        this.setState({
            show: false,
        });
    }

    handleTel = () => {
        console.log('tel');
        // storage it to localStorage for comment
        const { houseData } = this.props || {};
        const {
            rentUnitId,
            apartmentId,
            title,
        } = houseData;
        saveComment({
            rentUnitId,
            apartmentId,
            title,
            timestamp: new Date().getTime(),
        });
    }

    render() {
        const { show, dynamicTel } = this.state;
        const { name, img } = this.props.contactButlerData;

        const tmpArr = dynamicTel && dynamicTel.split(',');
        // 分机号
        const extTel = tmpArr && tmpArr[1];

        return (
            // !isAndroid() ?
            // <a
            //     href={`tel:${tel}`} 
            //     className="f-display-inlineblock"
            //     event-tracking-click=""
            //     event-tracking-param-tel={tel}
            //     event-tracking-param-rentunitid={window.rentUnitId}
            //     event-tracking-param-eventname="detailtel" 
            // >
            //     <span
            //         className={`f-display-inlineblock ${btnPrefix}`}
            //         onTouchTap={this.handleConcatTap}
            //         key={0}>
            //         联系管家
            //     </span>
            // </a> 
            // : 
            [
                <span
                    className={`f-display-inlineblock ${btnPrefix}`}
                    onTouchTap={this.handleConcatTap}
                    key={0}>
                    联系管家
                </span>,
                // 去掉弹窗
                <BottomDialog
                    key={1}
                    show={show}
                    onClose={this.onCloseDialogTap}
                    className={`${dialogPrefix}`}
                >
                    <BottomDialog.Body className={`${dialogPrefix}-body`}>
                        <div>
                            <img
                                className={`f-display-inlineblock f-vertical-middle ${dialogPrefix}-img`}
                                src={img || headImg}
                                alt="" 
                            />
                            <span className={`f-vertical-middle ${dialogPrefix}-name`}>{name}</span>
                        </div>
                        <div className={`${dialogPrefix}-tel-wrap`}>
                            <span className={`${dialogPrefix}-tel-text`}>电话号码：</span>
                            <a href={`tel:${dynamicTel}`} className={`f-display-inlineblock ${dialogPrefix}-tel`}>
                                {dynamicTel}
                            </a>
                        </div>
                        {
                            extTel ? 
                                (
                                    <div className={`${dialogPrefix}-extTel-wrap`}>
                                        <span className={`${dialogPrefix}-tel-text`}>分机号：</span>
                                        <span className={`${dialogPrefix}-tel ${dialogPrefix}-extTel`}>
                                            { extTel }&nbsp;
                                        </span>
                                        <span className={`${dialogPrefix}-tel-text ${dialogPrefix}-extTel-text`}>
                                            (拨打后需要用到哦)
                                        </span>
                                    </div>
                                )
                                : null
                        }
                        <div className={`${dialogPrefix}-tip`}>
                            <span className="icon">!</span>
                            <span className="text">为保护隐私，不会展示您的真实手机号哦</span>
                        </div>
                    </BottomDialog.Body>
                    <BottomDialog.Footer className={`${dialogPrefix}-footer`}>
                        <div className="f-display-inlineblock line" />
                        <a className="f-display-inlineblock text" onTouchTap={this.handleNoContactTap}>暂不联系</a>
                        <a href={`tel:${dynamicTel}`} onTouchTap={this.handleTel} className="f-display-inlineblock text">立即联系</a>
                    </BottomDialog.Footer>
                </BottomDialog>
            ]
        );
    }
}
