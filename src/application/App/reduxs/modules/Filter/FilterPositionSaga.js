import { select, call, put, take } from 'redux-saga/effects';

import { positionFilterPutActions, positionFilterAjaxActions } from './FilterPositionRedux';
import { originDataPositionSelector, statePositionSelector } from './FilterSelector';
import { FILTER_SEPARATOR, TypeAndPrefixMap, TypeMapAlphaArr } from 'const/filter';

import { getObjectKeyByIndex } from 'lib/util';

export function* transFilterPositionUrl(filterUrlObj) {
    console.log('transPositionUrl', filterUrlObj);
    // 由于位置筛选的原数据是通过异步获取的,更改state和label需要在异步之后
    // 而更改parmas可以同步
    yield call(transPositionUrlToParams, filterUrlObj);

    // 监听数据异步获取之后更改state和label
    yield take(positionFilterAjaxActions.POSITION_ORIGINDATA_FULFILLED);
    yield call(transPositionUrlToState, filterUrlObj);
    const positionState = yield select(statePositionSelector);
    yield call(changeFilterPosition, positionState);
}

export function* changeFilterPosition(state) {
    const originData = yield select(originDataPositionSelector);

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

    if (secondIndex !== -1) {
        const secondParamKey = TypeAndPrefixMap[alphaArr[0]];
        const secondId = getObjectKeyByIndex(firstObj, secondIndex);
        paramsObj[secondParamKey] = secondId;

        urlArr.push(`${alphaArr[0]}${secondId}`);
        const secondObj = firstObj[secondId];
        label = secondObj.text;

        if (thirdIndex !== -1) {
            const thirdParamKey = TypeAndPrefixMap[alphaArr[1]];
            const thirdId = getObjectKeyByIndex(secondObj, thirdIndex);
            paramsObj[thirdParamKey] = thirdId;

            urlArr.push(`${alphaArr[1]}${thirdId}`);
            const thirdObj = secondObj.sub;
            label = thirdObj[thirdId];
        }
    }

    url = urlArr.join(FILTER_SEPARATOR);

    yield put(positionFilterPutActions.updateFilterPosition({ url, params: paramsObj, state, label }));
}


function* transPositionUrlToParams(filterUrlObj) {
    const paramsObj = {};
    filterUrlObj && Object.keys(filterUrlObj).forEach((alpha) => {
        if (filterUrlObj[alpha]) {
            paramsObj[TypeAndPrefixMap[alpha]] = parseInt(filterUrlObj[alpha], 10);
        }
    });

    yield put(positionFilterPutActions.updateFilterPosition({ params: paramsObj }));
}

function* transPositionUrlToState(filterUrlObj) {
    console.log('transPositionUrlToState', filterUrlObj);
    const positionOriginData = yield select(originDataPositionSelector);

    const stateObj = {};
    let secondObj, firstObj;

    filterUrlObj && Object.keys(filterUrlObj).forEach((alpha, index) => {
        const idVal = filterUrlObj[alpha];

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
