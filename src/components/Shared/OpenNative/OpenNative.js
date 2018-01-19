import React, { PureComponent } from 'react';
import classnames from 'classnames';

import nativeSchema from './lib';
import logoImage from './images/logo.png';

import './styles.less';

const classPrefix = 'm-opennative';

export default class OpenNative extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    handleCloseTap = () => {
        this.setState({
            show: false,
        });
    }

    handleOpenTap = () => {
        nativeSchema.loadSchema({
            // 某个schema协议，例如login,
            schema: this.props.schema,

            //schema头协议，
            protocal: "nangua",

            //发起唤醒请求后，会等待loadWaiting时间，超时则跳转到failUrl，默认3000ms
            loadWaiting: 3000,

            iosFailUrl: 'https://itunes.apple.com/cn/app/id1330527627',
            // 安卓浏览器唤起失败，直接下载文件
            androidFailUrl: 'http://app-1252921496.file.myqcloud.com/nangua/app_official_latest.apk',
            // 安卓微信唤起失败跳转应用宝
            wxAndroidFailUrl: 'http://sj.qq.com/myapp/detail.htm?apkName=com.sohu.pumpkin',

            // // Android 客户端信息,可以询问 Android同事
            apkInfo: {
                PKG: "com.sohu.pumpkin",
                CATEGORY: "android.intent.category.BROWSABLE",
                ACTION: "android.intent.action.VIEW",
            },
        });
    }

    render() {
        const {
            show,
        } = this.state;

        return (
            show ? 
            <ul className={`${classPrefix} g-grid-row f-flex-justify-between f-flex-align-center`}>
                <li className={`${classPrefix}-left`}>
                    <img src={logoImage} alt="" className="image f-vertical-middle"/>
                    <span className="text f-vertical-middle">打开南瓜租房App</span>
                </li>
                <li className={`${classPrefix}-right`}>
                    <span className="f-display-inlineblock f-align-center openbtn"
                        onTouchTap={this.handleOpenTap}>立即打开</span>
                    <span
                        className="icon-big-close f-display-inlineblock closebtn"
                        onTouchTap={this.handleCloseTap}
                    >
                    </span>
                </li>
            </ul>
            : null
        );
    }
}
