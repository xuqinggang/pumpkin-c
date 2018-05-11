import { FILTER_ITEM_SEPARATOR, FILTER_SEPARATOR, TypeAndPrefixMap } from 'const/filter';

// function fixLabelFunc(text, tagGroupType) {
//     const tmpText = text === '不限' ? '' : text;
//     return tagGroupType === 'sharedRooms' ? `合租${tmpText}` : `整租${tmpText}`;
// }
export function filterUrlObjJoin(urlObj) {
    const urlArr = [];
    urlObj && Object.keys(urlObj).forEach((alpha) => {
        const val = urlObj[alpha];
        if (val !== undefined) {
            urlArr.push(`${alpha}${val}`);
        }
    });
    return filterUrlFrgArrJoin(urlArr);
}

export function filterUrlFrgArrJoin(urlArr) {
    return urlArr.filter(val => val !== '' && val !== undefined).join(FILTER_SEPARATOR);
}

export function transTagsState(tagsState, originData, fixLabelFunc = text => text) {
    let label = '',
        url = '';
    const paramsObj = {};

    const urlRtArr = [];
    let totalCount = 0;

    tagsState && Object.keys(tagsState).forEach((tagGroupType) => {
        const tagStateObj = tagsState[tagGroupType];

        const urlArr = [];
        let itemStr = '';

        tagStateObj && Object.keys(tagStateObj).forEach((tagIndex) => {
            const isSelected = tagStateObj[tagIndex];
            // if选中
            if (isSelected) {
                totalCount+=1;
                urlArr.push(tagIndex);

                const originDataArr = originData[tagGroupType].arr;
                const tagItem = originDataArr[tagIndex];
                const tagValue = tagItem.value;

                label = fixLabelFunc(tagItem.text, tagGroupType);

                // 如果没有，初始化为数组
                if (!paramsObj[tagGroupType]) {
                    paramsObj[tagGroupType] = [tagValue];
                } else {
                    paramsObj[tagGroupType].push(tagValue);
                }
            }
        });

        // 1l2
        itemStr = urlArr.join(FILTER_ITEM_SEPARATOR);

        const prefix = TypeAndPrefixMap[tagGroupType];
        // item字符串非空
        itemStr && urlRtArr.push(prefix + itemStr);
    });

    if (totalCount > 1) {
        label = '多选';
    }

    url = urlRtArr.join(FILTER_SEPARATOR);

    return {
        label,
        params: paramsObj,
        url,
    };
}

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
