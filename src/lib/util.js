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
