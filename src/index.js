import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import applyPolys from './polyfills';
import configureStore from './app/stores/configureStore';
import createRoutes from '';
import App from './App';
import '../src/app/sass/app.scss';

const store = configureStore(clientReducers, includeDevTools, clientMiddlewares);

export default function tdHelperApp(
    clientReducers,
    root,
    includDevTools = false,
    clientMiddlewares = []
) {
    applyPolys();
    const store = configureStore(clientReducers, includeDevTools, clientMiddlewares);
    const configReducer = clientReducers(undefined, 'CLIENT/LOAD_CONFIG');
    const config = configReducer.config;
    const routes = createRoutes(config.routes);
}

// ReactDOM.render(
//     <Provider store={store}
//   <App />,
//   document.getElementById('root')
// );
