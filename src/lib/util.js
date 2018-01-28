// 拼接url
export function urlJoin(...urlArr) {
    return urlArr.reduce(function(rt, cur) {
        if (!cur) return rt;
        if (cur.charAt(0) !== '/') {
            cur = `/${cur}`;
        }

        const curLen = cur.length;
        if (cur.charAt(curLen - 1) === '/') {
            cur = cur.substr(0, curLen - 1);
        }

        return `${rt}${cur}`;
    }, '');
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
        console.log('call', cval,  exp.toGMTString());
        document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
        console.log('document.cookie', document.cookie);
    }
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
