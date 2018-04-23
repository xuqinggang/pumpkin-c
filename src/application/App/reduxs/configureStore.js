import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas/sagas';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [];
    middlewares.push(sagaMiddleware);

    if (process.env.NODE_ENV !== 'production') {
        const { createLogger } = require('redux-logger');
        middlewares.push(createLogger());
    }

    const store = createStore(reducers, applyMiddleware(...middlewares));
    sagaMiddleware.run(sagas);

    return store;
}
