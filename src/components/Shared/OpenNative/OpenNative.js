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

            iosFailUrl: 'https://itunes.apple.com/cn/app/%E7%9F%A5%E4%B9%8E-%E7%9B%B4%E6%92%AD%E4%BA%92%E5%8A%A8%E9%97%AE%E7%AD%94-%E5%85%B1%E4%BA%AB%E6%9C%80%E7%83%AD%E7%9F%A5%E8%AF%86%E7%9A%84%E7%A4%BE%E4%BA%A4%E5%B9%B3%E5%8F%B0/id432274380?mt=8',
            // 安卓浏览器唤起失败，直接下载文件
            androidFailUrl: 'http://app-1252921496.file.myqcloud.com/nangua/app_official_latest.apk',
            // 安卓微信唤起失败跳转应用宝
            wxAndroidFailUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.futu.trader&g_f=991653',

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
