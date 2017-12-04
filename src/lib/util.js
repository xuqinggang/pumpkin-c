export function divideArray(array, limit) {
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
