import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import applyPolys from './polyfills';
import configureStore from './app/stores/configureStore';
import createRoutes from './routes';
import '../src/app/sass/app.scss';

export default function tdHelperApp(
    clientReducers,
    root,
    includeDevTools = false,
    clientMiddlewares = []
) {
    applyPolys();
    const store = configureStore(clientReducers, includeDevTools, clientMiddlewares);
    const configReducer = clientReducers(undefined, 'CLIENT/LOAD_CONFIG');
    const config = configReducer.config;
    const routes = createRoutes(config.routes);

    render(
        (<Provider store={store}>
          <Router history={browserHistory}>
            {routes}
          </Router>
        </Provider>),
        document.getElementById(root)
    );
}
