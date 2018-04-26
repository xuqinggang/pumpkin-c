import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas/sagas';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [];
    middlewares.push(sagaMiddleware);

    let enhancer;
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line
        const { createLogger } = require('redux-logger');
        middlewares.push(createLogger());
        // eslint-disable-next-line
        if (window.__REDUX_DEVTOOLS_EXTENSION__) {
            enhancer = compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__());
        } else {
            enhancer = applyMiddleware(...middlewares);
        }
    } else {
        enhancer = applyMiddleware(...middlewares);
    }

    const store = createStore(reducers, enhancer);
    sagaMiddleware.run(sagas);

    return store;
}
