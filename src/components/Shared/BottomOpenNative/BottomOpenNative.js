import React, { PureComponent } from 'react';
import classnames from 'classnames';

import nativeSchema from 'Shared/OpenNative/lib';

import './styles.less';

const classPrefix = 'm-bottomopennative';

export default class BottomOpenNative extends PureComponent {
    handleOpenTap = () => {
        console.log('this.props.schema', this.props.schema);
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
        return (
            <span className={`${classPrefix}`} onTouchTap={this.handleOpenTap}>
                下载APP
            </span>
        );
    }
}
