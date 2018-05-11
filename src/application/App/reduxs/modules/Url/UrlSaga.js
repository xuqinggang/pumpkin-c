import { spawn, take, call } from 'redux-saga/effects';

import { urlSagaActions } from './UrlRedux';
import urlConfig from './UrlConfig';

export function* urlNavigate(payload) {
    const {
        type,
        val,
    } = payload;

    let arg = val;
    if (!Array.isArray(arg)) {
        arg = [arg];
    }

    yield call(urlConfig[type], ...arg);
}

function* watchUrlNavigate() {
    while (true) {
        const { payload } = yield take(urlSagaActions.URL_NAVIGATE);
        yield call(urlNavigate, payload);
    }
}

const urlSagas = [
    spawn(watchUrlNavigate),
];
export default urlSagas;
