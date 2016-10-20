﻿import React, { Component } from 'react';
import { connect } from 'react-redux';

class Root extends Component {
    componentWillMount() {
        const { dispatch, config } = this.props;
        let activeRouteName = location.pathname;

        const defaultRoute = config.routes.find((route) => route.default === 'true');
        const defaultRoutePath = defaultRoute.path.startsWith('/') ? defaultRoute.path : `/${defaultRoute.path}`;
        dispatch(defaultRoutePath);

        if (activeRouteName === '/login' || activeRouteName === '/unknown' || activeRouteName === '/' || activeRouteName === null) {
            activeRouteName = defaultRoutePath;
        }

        dispatch(activeRouteName);
        dispatch(config.beforeLoginRedirectPromise);
    }

    render() {
        const { children, config } = this.props;

        return (
            <div ref="root">
                {children && React.cloneElement(children, { config: config })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    let clientProp = {};
    for (const prop in state) {
        if (prop !== 'smith' && prop !== 'router') {
            clientProp = state[prop];
        }
    }
    return {
        config: clientProp.config
    };
}

Root.propTypes = {
    config: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func,
    children: React.PropTypes.object
};

export default connect(mapStateToProps)(Root);
