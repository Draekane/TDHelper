import React from 'react';
import Hammer from 'react-hammerjs';
import $ from 'jquery';

class AppHeader extends React.Component {
    onMobileTap = () => {
        const topBarRight = $('.topbar-right');
        if (topBarRight && topBarRight.hasClass('bar-toggle')) {
            topBarRight.removeClass('bar-toggle');
        } else {
            topBarRight.addClass('bar-toggle');
        }
    };
    onNotificationTap = () => {
        const { notificationActions } = this.props;
        notificationActions.resetNotificationCount();

        const $rightbar = $('.rightbar');
        if ($rightbar.hasClass('right-aside-toggle')) {
            $rightbar.removeClass('right-aside-toggle');
        } else {
            $rightbar.addClass('right-aside-toggle');
        }
        $(window).trigger('resize');
    };
    onSearchTap = () => {
        const topSearchBar = $('.top-search-bar');
        if (topSearchBar && topSearchBar.hasClass('search-bar-toggle')) {
            topSearchBar.removeClass('search-bar-toggle');
        } else {
            topSearchBar.addClass('search-bar-toggle');
        }
    };
    render() {
        const { notifications, config } = this.props;
        const boldTitle = (this.props.config && this.props.config.boldTitle) ? this.props.config.boldTitle : '';
        const regTitle = (this.props.config && this.props.config.title) ? this.props.config.title : '';
        const headerImage = (this.props.config && this.props.config.headerImage) ? this.props.config.headerImage : '';
        let headerContent;
        if (headerImage.type === 'image') {
            headerContent = (<img className="header-image" src={headerImage.src} ></img>);
        } else {
            headerContent = (<i className={headerImage.src} />);
        }

        let searchBar;
        let search;
        let mobileSearch;
        const { GlobalSearch, GlobalToolbar, CustomTitle } = config;
        if (GlobalSearch) {
            search = (<li key="searchMenuOption"><Hammer onTap={ this.onSearchTap }><a href="#" className="btn-top-search"><i className="fa fa-search"></i></a></Hammer></li>);
            mobileSearch = (<li><Hammer onTap={ this.onSearchTap }><a href="#" className="btn-mobile-search btn-top-search"><i className="fa fa-search"></i></a></Hammer></li>);
            searchBar = (<div className="top-search-bar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="search-input-addon">
                                <GlobalSearch {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }

        let globalToolBar;
        if (GlobalToolbar) {
            globalToolBar = <GlobalToolbar {...this.props} />;
        }

        let headerTitle = (
            <span className="brand-text">
                <span><strong>{boldTitle}</strong>{regTitle}</span>
            </span>
        );
        if (CustomTitle) {
            headerTitle = <CustomTitle {...this.props} />;
        }

        const notificationBadge = (notifications.userNotificationCount + notifications.systemNotificationCount) > 0 ? (<span className="more-noty"></span>) : '';
        return (
            <header className="topbar clearfix">
                {searchBar}
                <div className="topbar-left pull-left">
                    <div className="clearfix">
                        <ul className="left-branding pull-left clickablemenu ttmenu dark-style menu-color-gradient">
                            <li><span className="left-toggle-switch"><i className="fa fa-bars"></i></span></li>
                            <li>
                                <div className="logo">
                                    <a href="/">{headerContent}</a>
                                    {headerTitle}
                                </div>
                            </li>
                        </ul>
                        <ul className="branding-right pull-right">
                            {mobileSearch}
                            <li>
                                <Hammer onTap={ this.onMobileTap }>
                                    <a href="#" className="btn-mobile-bar">
                                        <i className="fa fa-bars"></i>
                                    </a>
                                </Hammer>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="topbar-right pull-right">
                    <div className="clearfix">
                        <ul className="left-bar-switch pull-left">
                            <li><span className="left-toggle-switch"><i className="fa fa-bars"></i></span></li>
                        </ul>
                        <ul className="pull-right top-right-icons">
                            {search}
                            <li>
                                <Hammer onTap={ this.onNotificationTap }>
                                    <a href="#" className="right-toggle-switch">
                                        <i className="fa fa-align-left"></i>{ notificationBadge }
                                    </a>
                                </Hammer>
                            </li>

                        </ul>
                    </div>
                </div>
                { globalToolBar }
            </header>
        );
    }
}

AppHeader.propTypes = {
    notifications: React.PropTypes.object.isRequired,
    notificationActions: React.PropTypes.object.isRequired,
    config: React.PropTypes.shape({
        headerImage: React.PropTypes.shape({
            src: React.PropTypes.string.isRequired
        }),
        title: React.PropTypes.string,
        boldTitle: React.PropTypes.string
    })
};

export default AppHeader;