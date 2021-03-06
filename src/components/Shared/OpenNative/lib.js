(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        root.nativeSchema = factory();
    }
}(this, function() {
    var ua = window.navigator.userAgent;

    // UA鉴定
    var browser = {
        isAndroid: function() {
            return ua.match(/Android/i) ? true : false;
        },
        isMobileQQ: function() {
            return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua) || /MQQBrowser/i.test(ua);
        },
        isIOS: function() {
            return ua.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        isWx: function() {
            return ua.match(/micromessenger/i) ? true : false;
        }
    };

    var AppConfig = {

        // 协议头
        PROTOCAL: "xxxx",

        // 主页
        HOME: "xxxx",

        // 唤起失败时的跳转链接
        FAILBACK: {
            // WXANDROID: "",
            ANDROID: "",
            IOS: ""
        },

        // Android apk 相关信息
        APK_INFO: {
            PKG: "com.sohu.pumpkin",
            CATEGORY: "android.intent.category.DEFAULT",
            ACTION: "android.intent.action.VIEW"
        },

        // 唤起超时时间，超时则跳转到下载页面
        LOAD_WAITING: 3000
    };


    // 是否为Android下的chrome浏览器，排除mobileQQ；
    // Android下的chrome，需要通过特殊的intent 来唤醒
    // refer link：https://developer.chrome.com/multidevice/android/intents
    var isAndroidChrome = (ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)) &&
        browser.isAndroid() && !browser.isMobileQQ();

    return {
        /**
         * [mixinConfig 重新收拢配置]
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        mixinConfig: function(config) {
            if (!config) {
                return;
            }

            AppConfig.PROTOCAL = config.protocal || AppConfig.PROTOCAL;
            AppConfig.schema = config.schema || AppConfig.HOME;
            AppConfig.LOAD_WAITING = config.loadWaiting || AppConfig.LOAD_WAITING;

            if (browser.isIOS()) {
                if (browser.isWx()) {
                    AppConfig.FAILBACK.IOS = config.wxIosFailUrl || config.iosFailUrl;
                } else {
                    AppConfig.FAILBACK.IOS = config.iosFailUrl;
                }
            } else if (browser.isAndroid()) {
                if (browser.isWx()) {
                    AppConfig.FAILBACK.ANDROID = config.wxAndroidFailUrl || config.androidFailUrl;
                } else {
                    AppConfig.FAILBACK.ANDROID = config.androidFailUrl;
                }
                AppConfig.APK_INFO = config.apkInfo || AppConfig.APK_INFO;
            }
        },

        /**
         * [generateSchema 根据不同的场景及UA生成最终应用的schema]
         * @return {[type]}                [description]
         */
        generateSchema: function(schema) {
            var localUrl = window.location.href;
            var schemaStr = '';

            // 如果未定义schema，则根据当前路径来映射
            if (!schema) {
                schemaStr = AppConfig.HOME;
                // 在schema省略时，可以根据当前页面的url，设置不同的默认值
            } else {
                schemaStr = schema;
            }

            // 如果是安卓chrome浏览器，则通过intent方式打开
            if (isAndroidChrome) {
                schemaStr = "intent://" + schemaStr + "#Intent;" +
                    "scheme=" + AppConfig.PROTOCAL + ";" +
                    "package=" + AppConfig.APK_INFO.PKG + ";" +
                    "category=" + AppConfig.APK_INFO.CATEGORY + ";" +
                    "action=" + AppConfig.APK_INFO.ACTION + ";" +
                    "S.browser_fallback_url=" + encodeURIComponent(AppConfig.FAILBACK.ANDROID) + ";" +
                    "end";
            } else {
                schemaStr = AppConfig.PROTOCAL + "://" + schemaStr;
            }

            return schemaStr;
        },

        /**
         * [loadSchema 唤醒native App，如果无法唤醒，则跳转到下载页]
         * @return {[type]} [description]
         */
        loadSchema: function(config) {
            this.mixinConfig(config);

            // 由于第一次点击打开app，走了setTimeout，判断出没有安装app,所以直接跳转下载地址
            // (此处也是为了避免safari浏览器后续多次点击打开app按钮,由于setTimeout缘故导致无法跳转到正确的itunes下载地址)
            // if (AppConfig.isNotInstallApp) {
            //     window.location.href = browser.isIOS() ? AppConfig.FAILBACK.IOS : AppConfig.FAILBACK.ANDROID;
            //     return;
            // }

            var schemaUrl = this.generateSchema(AppConfig.schema);

            var iframe = document.createElement("iframe"),
                aLink = document.createElement("a"),
                body = document.body,
                loadTimer = null;

            // 隐藏iframe及a
            aLink.style.cssText = iframe.style.cssText = "display:none;width:0px;height:0px;";

            // Android 微信不支持schema唤醒，必须提前加入腾讯的白名单
            if (browser.isWx() && browser.isAndroid()) {
                window.location.href = AppConfig.FAILBACK.ANDROID;
                return;

                // ios 9 safari 不支持iframe的方式跳转
            } else if (browser.isIOS()) {
                if (browser.isWx()) {
                    window.location.href = AppConfig.FAILBACK.IOS;
                    return;
                } else {
                    // body.appendChild(iframe);
                    // iframe.src = schemaUrl;
                    aLink.href = schemaUrl;
                    body.appendChild(aLink);
                    aLink.click();
                }

                // Android chrome 不支持iframe 方式唤醒
                // 适用：chrome,leibao,mibrowser,opera,360
            } else if (isAndroidChrome) {
                aLink.href = schemaUrl;
                body.appendChild(aLink);
                aLink.click();

                // 其他浏览器
                // 适用：UC,sogou,firefox,mobileQQ
            } else {
                body.appendChild(iframe);
                iframe.src = schemaUrl;
            }

            // 如果LOAD_WAITING时间后,还是无法唤醒app，则直接打开下载页
            // opera 无效
            var start = Date.now(),
                that = this;

            loadTimer = setTimeout(function() {
                clearTimeout(loadTimer);
                if (document.hidden || document.webkitHidden) {
                    return;
                }

                // 如果app启动，浏览器最小化进入后台，则计时器存在推迟或者变慢的问题
                // 那么代码执行到此处时，时间间隔必然大于设置的定时时间
                if (Date.now() - start > AppConfig.LOAD_WAITING + 200) {
                    // come back from app
                } else {
                    AppConfig.isNotInstallApp = true;
                    // 如果浏览器未因为app启动进入后台，则定时器会准时执行，故应该跳转到下载页
                    window.location.href = browser.isIOS() ? AppConfig.FAILBACK.IOS : AppConfig.FAILBACK.ANDROID;
                }

            }, AppConfig.LOAD_WAITING);

            // 当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
            // 在部分浏览器中可行，网上提供方案，作hack处理
            var visibilitychange = function() {
                var tag = document.hidden || document.webkitHidden;
                tag && clearTimeout(loadTimer);
            };

            document.addEventListener('visibilitychange', visibilitychange, false);
            document.addEventListener('webkitvisibilitychange', visibilitychange, false);
            // pagehide 必须绑定到window
            window.addEventListener('pagehide', function() {
                clearTimeout(loadTimer);
            }, false);
        }
    };
}));
