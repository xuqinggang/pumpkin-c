import { TypeAndPrefixMap } from 'const/filter';
import { historyRecordStorage } from 'application/App/storage';

export function removeEmTag(text) {
    const reg = /<\/?em>/g;
    return text.replace(reg, '');
}

// history record localstorage
export function historyRecordSetStorage(data) {
    const {
        text,
    } = data;

    const reg = /<\/?em>/g;
    const newText = text.replace(reg, '');
    historyRecordStorage.update({ ...data, text: newText });
}

// 生成位置筛选的url片段
export function genPositionUrlObj({
    superField, // districtId or undefined
    superFieldValue, // 2
    field, // circleId or districtId
    fieldValue, // 6169
}) {
    const urlObj = {};
    if (superField) {
        urlObj[TypeAndPrefixMap[superField]] = superFieldValue;
    }

    if (field) {
        urlObj[TypeAndPrefixMap[field]] = fieldValue;
    }

    return urlObj;
}
