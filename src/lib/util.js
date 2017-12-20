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
