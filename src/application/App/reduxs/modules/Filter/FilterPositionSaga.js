import { select, call, put, take, spawn } from 'redux-saga/effects';

import { positionFilterPutActions, positionFilterAjaxActions } from './FilterPositionRedux';
import { positionOriginDataSelector, positionStateSelector } from './FilterSelector';
import { FILTER_SEPARATOR, TypeAndPrefixMap, TypeMapAlphaArr } from 'const/filter';
import { filterUrlObjJoin } from './utils';

import { getObjectKeyByIndex } from 'lib/util';

export function* transPositionFilterUrl(filterUrlObj) {
    // 由于位置筛选的原数据是通过异步获取的,更改state和label需要在异步之后
    // 而更改parmas可以同步
    yield call(transPositionUrlToParams, filterUrlObj);
    yield spawn(asyncUpdate);

    function* asyncUpdate() {
        // 监听数据异步获取之后更改state和label
        const originData = yield select(positionOriginDataSelector);
        // 如果position originData已经获取到则不需要监听
        if (!originData.districts || !originData.subways) {
            yield take(positionFilterAjaxActions.POSITION_ORIGINDATA_FULFILLED);
        }
        yield call(transPositionUrlToState, filterUrlObj);
        const positionState = yield select(positionStateSelector);
        yield call(changePositionFilter, positionState);
    }
}

export function* changePositionFilter(state) {
    const originData = yield select(positionOriginDataSelector);

    const paramsObj = {};
    let label = '';
    let url = '';

    const {
        firstIndex,
        secondIndex,
        thirdIndex,
    } = state;

    const type = getObjectKeyByIndex(originData, firstIndex);

    const firstObj = originData[type];

    const urlArr = [];
    const alphaArr = TypeMapAlphaArr[type];

    if (secondIndex !== -1 && secondIndex !== 0) {
        const secondParamKey = TypeAndPrefixMap[alphaArr[0]];
        const secondId = getObjectKeyByIndex(firstObj, secondIndex);
        paramsObj[secondParamKey] = parseInt(secondId, 10);

        urlArr.push(`${alphaArr[0]}${secondId}`);
        const secondObj = firstObj[secondId];
        label = secondObj.text;

        if (thirdIndex !== -1) {
            const thirdObj = secondObj.sub;
            const thirdParamKey = TypeAndPrefixMap[alphaArr[1]];
            const thirdId = getObjectKeyByIndex(thirdObj, thirdIndex);
            paramsObj[thirdParamKey] = parseInt(thirdId, 10);

            urlArr.push(`${alphaArr[1]}${thirdId}`);
            label = thirdObj[thirdId];
        }
    }

    url = urlArr.join(FILTER_SEPARATOR);

    yield put(positionFilterPutActions.updateFilterPosition({
        url,
        params: paramsObj,
        state,
        label,
    }));
}

function* transPositionUrlToParams(filterUrlObj) {
    const paramsObj = {};
    filterUrlObj && Object.keys(filterUrlObj).forEach((alpha) => {
        if (filterUrlObj[alpha]) {
            paramsObj[TypeAndPrefixMap[alpha]] = parseInt(filterUrlObj[alpha], 10);
        }
    });
    yield put(positionFilterPutActions.updateFilterPosition({
        params: paramsObj,
        url: filterUrlObjJoin(filterUrlObj),
    }));
}

function* transPositionUrlToState(filterUrlObj) {
    const positionOriginData = yield select(positionOriginDataSelector);

    const stateObj = {};
    let secondObj, firstObj;

    filterUrlObj && Object.keys(filterUrlObj).forEach((alpha, index) => {
        const idVal = String(filterUrlObj[alpha]);

        if (index === 0) {
            // TypeAndPrefixMap.districtId = 'a', alpha === 'a' 则firstIndex = 0
            stateObj.firstIndex = alpha === TypeAndPrefixMap.districtId ? 0 : 1;
            // postionType: districts || subways
            const postionType = getObjectKeyByIndex(positionOriginData, stateObj.firstIndex);
            firstObj = positionOriginData[postionType];
            secondObj = firstObj[idVal].sub;

            const firstIdArr = Object.keys(firstObj);
            stateObj.secondIndex = firstIdArr.indexOf(idVal);
            return;
        }

        if (index === 1) {
            const secondIdArr = Object.keys(secondObj);
            stateObj.thirdIndex = secondIdArr.indexOf(idVal);
        }
    });

    yield put(positionFilterPutActions.updateFilterPosition({ state: stateObj }));
}
