import Service from 'lib/Service';
import { isWeiXin, dynamicScript } from 'lib/util';

// 调用焦点，获取用于微信自定义分享的配置信息
function _ajaxFocusWxConfig() {
    return Service.get('https://wx-open-api.focus.cn/ajax/wxJsConfig', {
        url: window.location.href.split('#')[0],
        sceneType: 6,
    })
        .then((data) => {
            console.log('isWeiXin', data);
            if (data.code === 200) {
                return data.data;
            } else {
                throw new Error('error');
            }
        })
        .catch((err) => {
            throw new Error(err);
        });
}

export function wxShare(shareObj = {}) {
    var api_list = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
    _ajaxFocusWxConfig()
        .then((data) => {
            console.log('isWeiXin', data);
            wx.config({
                debug: false, //true为调试模式，线上需置为false
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: api_list// 需要使用的JS接口列表
            });

            wx.ready(function () {
                console.log('wx ready');
                wx.onMenuShareTimeline(shareObj); //分享到朋友圈
                wx.onMenuShareAppMessage(shareObj); //分享给朋友
            });

            wx.error(function(res) {
                alert(JSON.stringify(res));
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        })
}

export function execWxShare(sharedObj) {
    if (isWeiXin()) {
        dynamicScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
            console.log('isWeiXinxx');
            wxShare(sharedObj);
        });
    }
}