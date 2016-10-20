﻿import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import appReducers from '../reducers/common/rootReducer';


export default function configureStore(clientReducers, includeDevTools, clientMiddlewares) {
    if (!clientMiddlewares instanceof Array) {
        throw new Error('clientMiddlewares parameter must be an instance of Array');
    }

    const configReducer = clientReducers(undefined, 'CLIENT/LOAD_CONFIG');
    const config = configReducer.config;

    let createStoreWithMiddleware;
    if (includeDevTools) {
        createStoreWithMiddleware = compose(
            applyMiddleware(thunkMiddleware),
            applyMiddleware(createLogger()),
            applyMiddleware(...clientMiddlewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )(createStore);
    } else {
        createStoreWithMiddleware = compose(
            applyMiddleware(thunkMiddleware),
            applyMiddleware(...clientMiddlewares)
        )(createStore);
    }

    const reducers = { tdhelper: appReducers };
    reducers[config.appName] = clientReducers;
    const allReducers = combineReducers(reducers);

    return createStoreWithMiddleware(allReducers);
}
