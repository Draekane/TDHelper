import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Root from './containers/root';
import App from './components/app';
import Login from './components/login';
import Unknown from './components/unknown';
import NotFound from './components/notFound';

// Recursively builds a set of react routes
function forgeChildRoutes(routes) {
    const reactRoutes = [];
    if (routes) {
        let defaultRouteSet = false;
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            const component = route.component;
            const routeKey = `Route_${route.path}_${i}`;
            route.path = route.path.startsWith('/') ? route.path : `/${route.path}`;
            reactRoutes.push(<Route key={routeKey} path={route.path} component={component} />);

            // Add paramRoutes for this component
            if (route.paramRoutes) {
                const paramRoutes = route.paramRoutes;
                for (let j = 0; j < paramRoutes.length; j++) {
                    const paramRouteKey = `ParamRoute_${paramRoutes[j].path}_${j}`;
                    const paramRoute = paramRoutes[j];
                    paramRoute.path = paramRoute.path.startsWith('/')
                        ? paramRoute.path : `/${paramRoute.path}`;
                    if (paramRoute) {
                        const paramComponent = paramRoute.component ? paramRoute.component : route.component;
                        reactRoutes.push(<Route key={paramRouteKey} path={paramRoute.path} component={paramComponent} />);
                    }
                }
            }

            // Add redirects for this route
            if (route.redirects) {
                const redirects = route.redirects;
                for (let j = 0; j < redirects.length; j++) {
                    const redirectRouteKey = `RedirectRoute_${route.path}_${j}`;
                    const redirectRoute = redirects[j];
                    redirectRoute.from = redirectRoute.from.startsWith('/')
                        ? redirectRoute.from : `/${redirectRoute.from}`;
                    redirectRoute.to = redirectRoute.to.startsWith('/')
                        ? redirectRoute.to : `/${redirectRoute.to}`;
                    reactRoutes.push(
                        <Redirect key={redirectRouteKey} from={redirectRoute.from} to={redirectRoute.to} />
                    );
                }
            }

            // Add default route if necessary
            if ((route.default === 'true' || routes.length === (i + 1)) && !defaultRouteSet) {
                const defaultRouteKey = `DefaultRoute_${route.path}_${i}`;
                reactRoutes.push(<IndexRoute key={defaultRouteKey} component={component} />);
                route.default = 'true';
                defaultRouteSet = true;
            }

            // Add child routes
            if (route.routes && route.routes.length > 0) {
                const childRoutes = forgeChildRoutes(route.routes);
                for (let j = 0; j < childRoutes.length; j++) {
                    reactRoutes.push(childRoutes[j]);
                }
            }
        }
    }
    return reactRoutes;
}

export default function (routes) {
    const reactRoutes = forgeChildRoutes(routes);

    const navRoutes = (
        <Route path="/" component={Root}>
            <Route path="/login" component={Login} />
            <Route path="/unknown" component={Unknown} />
            <Route path="/" component={App}>
                {reactRoutes}
            </Route>
            <IndexRoute component={App} />
            <Route path="*" component={NotFound} />
        </Route>
    );

    return navRoutes;
}
