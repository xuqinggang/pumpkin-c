import React, { PureComponent } from 'react';
import classnames from 'classnames';
import BottomDialog from 'Shared/BottomDialog';
import headImg from 'components/App/HouseDetail/RoommateInfo/images/male.png';
import { isAndroid } from 'lib/const';

import './styles.less';

const btnPrefix = 'm-contactbutler-btn';
const dialogPrefix = 'm-contactbutler-dialog'

export default class ContactButler extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleConcatTap = (e) => {
        this.setState({
            show: true,
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

    render() {
        const { show } = this.state;
        const { name, img, tel } = this.props.contactButlerData;

        const tmpArr = tel && tel.split(',');
        // 分机号
        const extTel = tmpArr && tmpArr[1];

        return (
            !isAndroid ? 
            <a
                href={`tel:${tel}`} 
                className="f-display-inlineblock"
                event-tracking-click=""
                event-tracking-param-tel={tel}
                event-tracking-param-rentunitid={window.rentUnitId}
                event-tracking-param-eventname="detailtel" 
            >
                <span
                    className={`f-display-inlineblock ${btnPrefix}`}
                    onTouchTap={this.handleConcatTap}
                    key={0}>
                    联系管家
                </span>
            </a>
            :
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
                            <a href={`tel:${tel}`} className={`f-display-inlineblock ${dialogPrefix}-tel`}>{tel}</a>
                        </div>
                        <div className={`${dialogPrefix}-extTel-wrap`}>
                            <span className={`${dialogPrefix}-tel-text`}>分机号：</span>
                            <span className={`${dialogPrefix}-tel ${dialogPrefix}-extTel`}>{ extTel }&nbsp;</span>
                            <span className={`${dialogPrefix}-tel-text ${dialogPrefix}-extTel-text`}>
                                (拨打后需要用到哦)
                            </span>
                        </div>
                    </BottomDialog.Body>
                    <BottomDialog.Footer className={`${dialogPrefix}-footer`}>
                        <div className="f-display-inlineblock line" />
                        <a className="f-display-inlineblock text" onTouchTap={this.handleNoContactTap}>暂不联系</a>
                        <a href={`tel:${tel}`} className="f-display-inlineblock text">立即联系</a>
                    </BottomDialog.Footer>
                </BottomDialog>
            ]
        );
    }
}
