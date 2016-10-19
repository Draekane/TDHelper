﻿import React from 'react';
import { Link } from 'react-router';

class AppNav extends React.Component {

    buildNavBarItem(route = null, index = 0) {
        if (route === null) {
            return [];
        }

        if (route.noDisplay) {
            return [];
        }

        const navbarItems = [];
        const navKey = `nav_${index + 1}`;
        navbarItems.push(<li key={navKey} className="list-title">{route.navTitle}</li>);

        const childRoutes = [];
        if (route.routes) {
            route.routes.forEach((childRoute) => {
                const childNavKey = `ChildNavKey_${childRoute.path}`;
                childRoutes.push(<li key={childNavKey}><Link to={childRoute.path}>{childRoute.navTitle}</Link></li>);
            });
        }

        const menuNavKey = `menu_nav_${index + 1}`;
        if (route.image.type === 'image') {
            const routeClass = location.pathname.toLowerCase().startsWith(route.path.toLowerCase()) ? 'nav-image active' : 'nav-image';
            if (childRoutes.length > 0) {
                navbarItems.push(<li key={menuNavKey}><a href="#"><img className={routeClass} src={route.image.src}></img><span className="list-label">{route.navTitle}</span><span className="acc-icon"></span></a><ul>{childRoutes}</ul></li>);
            } else {
                navbarItems.push(<li key={menuNavKey}><Link to={route.path}><img className={routeClass} src={route.image.src}></img><span className="list-label">{route.navTitle}</span></Link></li>);
            }
        } else {
            if (childRoutes.length > 0) {
                navbarItems.push(<li key={menuNavKey}><a href="#"><i className={route.image.src}></i><span className="list-label">{route.navTitle}</span><span className="acc-icon"></span></a><ul>{childRoutes}</ul></li>);
            } else {
                navbarItems.push(<li key={menuNavKey}><Link to={route.path}><i className={route.image.src}></i><span className="list-label">{route.navTitle}</span></Link></li>);
            }
        }

        return navbarItems;
    }

    configureNavbar() {
        const { config } = this.props;

        if (!config.routes) return [];

        const navbarItems = [];
        config.routes.forEach((route, index) => {
            const items = this.buildNavBarItem(route, index);
            navbarItems.push(...items);
        });

        return navbarItems;
    }
    render() {
        const navbarItems = this.configureNavbar();

        return (
            <aside className="iconic-leftbar">
                <div className="iconic-aside-container">
                    <ul className="list-accordion">
                        {navbarItems}
                    </ul>
                </div>
            </aside>
        );
    }
}

AppNav.propTypes = {
    config: React.PropTypes.object.isRequired
};

export default AppNav;