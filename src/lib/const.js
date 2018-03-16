export default {
    isWeiXin: () => window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', // 判断是否为微信浏览器 
    isAndroid: () => {
        const ua = window.navigator.userAgent;
        return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
    },
    isIos: () => !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isApp: () => {
        const ua = window.navigator.userAgent;
        return ua.indexOf('FocusLiveApp') !== -1 || ua.indexOf('NanguaApp') !== -1; // 判断是否在焦点或者南瓜租房app中
    },
    isiPhoneX: () => window.navigator.userAgent.indexOf('iPhone') !== -1 && window.screen.availHeight === 812 && window.screen.availWidth === 375,
    // eg:app中跳到h5优惠券需要去掉头部
    isRmHead: () => window.location.href.indexOf('rmhead') !== -1,
}
