import { FILTER_ITEM_SEPARATOR, FILTER_SEPARATOR, TypeAndPrefixMap } from 'const/filter';

// tagsUrlObj: { f: 2l3, g:4 }
// return stateObj: { sharedRooms: { 2: true, 3: true }, wholeRooms: { 4: true } }
export function transTagsUrlObjToState(tagsUrlObj) {
    const stateObj = {};

    tagsUrlObj && Object.keys(tagsUrlObj).forEach((prefix) => {
        const valueStr = tagsUrlObj[prefix];
        if (!valueStr) return;

        const correspondStateObj = {};
        const valueArr = valueStr.split(FILTER_ITEM_SEPARATOR);
        valueArr.forEach((value) => {
            correspondStateObj[value] = true;
        });

        stateObj[TypeAndPrefixMap[prefix]] = correspondStateObj;
    });

    return stateObj;
}

// filterUrl: a123-b123
// return filterUrlObj: { a:123, b:123 }
export function transFilterUrlToObj(filterUrl) {
    const filterUrlArr = filterUrl.split(FILTER_SEPARATOR);
    const filterUrlObj = {};

    filterUrlArr.forEach((filerUrlItem) => {
        if (!filerUrlItem) return;
        const alpha = filerUrlItem.substr(0, 1);
        const value = filerUrlItem.substr(1);
        filterUrlObj[alpha] = value;
    });

    return filterUrlObj;
}
