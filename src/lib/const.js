const ua = window.navigator.userAgent;

export default {
    isWeiXin: ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', // 判断是否为微信浏览器 
    isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
    isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isApp: ua.indexOf('FocusLiveApp') !== -1 || ua.indexOf('NanguaApp') !== -1, // 判断是否在焦点或者南瓜租房app中
    isiPhoneX: ua.indexOf('iPhone') !== -1 && screen.availHeight === 812 && screen.availWidth === 375,
}
