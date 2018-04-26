// 根据key数组截取对象
export function sliceObjbyKeys(obj, keys) {
    if (!(obj && keys && keys.length)) return null;

    const distObj = {};
    keys.forEach((key) => {
        if (obj[key] !== undefined) {
            distObj[key] = obj[key];
        }
    });

    return Object.keys(distObj).length ? distObj : null;
}

// 获去对象对应索引的键
export function getObjectKeyByIndex(obj, index) {
    const keys = Object.keys(obj);
    return keys[index];
}

// 反转对象的属性和值
export function reverseObjKeyValue(obj) {
    const reverseObj = {};
    for(let key in obj) {
        reverseObj[obj[key]] = key;
    }

    return reverseObj;
}

// 时间格式化
export function dateFormat(timestamp, fmt = 'yyyy-MM-dd') {
    const date = new Date(timestamp);
    const o = {
        // 月份
        'M+': date.getMonth()  +  1,
        // 日
        'd+': date.getDate(),
        // 小时
        'h+': date.getHours(),
        // 分
        'm+': date.getMinutes(),
        // 秒
        's+': date.getSeconds(),
        //季度 
        'q+': Math.floor((date.getMonth()  +  3)  /  3),
        // 毫秒
        'S': date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
        fmt  =  fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

// 防抖
export function debounce(func, waitms, immediate) {
    let timer;
    return function debounceInner() {
        timer && clearTimeout(timer);

        if (immediate && !timer) {
            func();
            immediate = false;
            return;
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            func();
        }, waitms);
    };
}

export function parseUrlQueryFields() {
    const search = window.location.search;
    const queryFieldsObj = {};
    const url = decodeURIComponent(window.location.href);
    const pt = url.indexOf('?');
    if (pt === -1) {
        return {
            queryFieldsObj,
            search,
        };
    }
    const urlQuery = url.substr(pt + 1);
    const queryFieldsArr = urlQuery.split('&');
    queryFieldsArr.forEach((query) => {
        if (!query) return;
        const keyAndValueArr = query.split('=');
        queryFieldsObj[keyAndValueArr[0]] = keyAndValueArr[1];
    });
    return {
        queryFieldsObj,
        search,
    };
}

export function hasSearchField(field) {
    return window.location.search.indexOf(field) > -1;
}

export function stringifyUrlSearch(searchObj = {}) {
    const searchArr = [];
    searchObj && Object.keys(searchObj).forEach((searchParam) => {
        const val = searchObj[searchParam];
        searchArr.push(`${searchParam}=${val}`);
    });
    const searchStr = searchArr.join('&');

    return searchStr ? `?${searchStr}` : '';
}

// 来自哪个页
export function getPageFrom(search) {
    const regRt = search && search.match(/(pagefrom)=(\b\S+\b)/);

    return regRt && regRt[2];
}

// 拼接url
// return /bj/nangua/list/
export function urlJoin(...urlArr) {
    const result = urlArr.reduce((rt, cur) => {
        let tmpCur = cur;
        if (!tmpCur) return rt;

        if (tmpCur.charAt(0) !== '/') {
            tmpCur = `/${tmpCur}`;
        }

        const curLen = tmpCur.length;
        if (tmpCur.charAt(curLen - 1) === '/') {
            tmpCur = tmpCur.substr(0, curLen - 1);
        }

        return `${rt}${tmpCur}`;
    }, '');

    return `${result}/`;
}

// 获取字符串长度（汉字算两个字符，字母数字算一个）
export function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
}

export function getCookie(key) {
    let arr, reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

// 删除cookie需要指定path
export function clearCookie(key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(key);
    if(cval != null) {
        document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
    }
}

export function setCookie(key, value) {
    const deltaDay = 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + deltaDay*24*60*60*1000);
    document.cookie = key + "="+ value + ";expires=" + exp.toGMTString() + ";path=/";
}

export function isHasCookie(key) {
    const cookieStr = document.cookie;
    if (!cookieStr) return false;

    return cookieStr.indexOf(key) !== -1;
}

// 动态加载标签
const dynamicScriptObj = {};
export function dynamicScript(src, callback) {
    // 如果该scr，已加载过，则直接执行callback
    if (dynamicScriptObj[src]) {
        callback();
        return;
    }

    var bodyDom = document.getElementsByTagName('body')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
            callback();
            dynamicScriptObj[src] = true;
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null; 
        }
    };
    script.src= src;
    bodyDom.appendChild(script);
}

export function findArrayItemByPathIndex(arr, pathIndexArr, nextLevelName) {
    if (!arr.length || !pathIndexArr.length) return;
    let itemResult = null;
    itemResult = arr[pathIndexArr[0]];
    if (pathIndexArr && pathIndexArr.length === 1) {
        return itemResult;
    }

    let tmpPathIndexArr = pathIndexArr.slice(1);
    tmpPathIndexArr && tmpPathIndexArr.forEach(function(index) {
        itemResult = itemResult[nextLevelName][index];
    });

    return itemResult;
}
// 动态改变title
export function dynamicDocTitle(title) {
    if (title) {
        document.title = title;
    }
}

// 切割数组
export function divideArray(array, limit) {
    if (!array || (array && 0 === array.length)) return [];

    const newArray = [];
    let cutPt = 0;
    let endPt = limit;
    let cutArr = array.slice(cutPt, endPt);

    while (cutArr.length) {
        newArray.push(cutArr);
        cutPt += limit;
        endPt += limit;
        cutArr = array.slice(cutPt, endPt);
    };

    return newArray;
}

// 解析url
export function parseUrl(url) {
    const rt = {
        query: {},
    };
    const arr = url.split('?');
    const queryStr = arr[1];

    if (arr && queryStr) {
        const queryArr = queryStr.split('&');
        queryArr.forEach((queryItem) => {
            const [key, val] = queryItem.split('=');
            if (key) {
                rt.query[key] = val;
            }
        })
    }

    return rt;
}

export function shallowEqual(objA, objB) {
    // 如果objA和objB是严格相等，结果相等
    if (objA === objB) {
        return true
    }

    if (!objA || !objB) {
        return false;
    }

    // 获取 objA 和 objB 的所有属性
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    // 属性长度不相等，结果不相等
    if (keysA.length !== keysB.length) {
        return false
    }

    // 使用hasWon引用Object.prototype.hasOwnProperty方法
    const hasOwn = Object.prototype.hasOwnProperty

    // objB 中不含有 objA 中的属性，结果不相等
    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) ||
            objA[keysA[i]] !== objB[keysA[i]]) {
            return false
        }
    }

    return true 
}

export const isValidValue = value => (!(value == null || value === ''));

export const getDocHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
};

export function scrollTo(scrollTop) {
    document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
}

export function getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}

export const isNumber = value => typeof value === 'number';
export const isString = value => typeof value === 'string';

export function getWithDefault(obj, key, defaultVal) {
    /* key  a.b.c */
    try {
        const keys = key.split('.');
        let r = obj;
        let k = keys.shift();
        while (k) {
            r = r[k];
            k = keys.shift();
        }
        if (r === undefined || r === null) {
            return defaultVal;
        }
        return r;
    } catch (e) {
        return defaultVal;
    }
}

const getDomOffsetHeight = (dom) => {
    return (dom && dom.offsetHeight) || 0;
};

export const getFilterFixScrollTop = () => {
    const bannerDomHeight = Math.round(getDomOffsetHeight(document.querySelector('.m-indexbanner')));
    const recommendDomHeight = Math.round(getDomOffsetHeight(document.querySelector('.m-indexrecommend')));
    return Math.round(bannerDomHeight) + Math.round(recommendDomHeight);
}
