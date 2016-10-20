import React, { Component } from 'react';
import AppHeader from './header';
import AppNav from './nav';
import ScrollToTop from 'react-scroll-up';
import $ from 'jquery';
import ScrollUp from './ScrollUp';
import { withRouter } from 'react-router';

class App extends Component {
    static propTypes = {
        auth: React.PropTypes.object,
        config: React.PropTypes.object,
        notify: React.PropTypes.object,
        authActions: React.PropTypes.object,
        notificationActions: React.PropTypes.object,
        children: React.PropTypes.object,
        router: React.PropTypes.object
    };

    componentDidMount() {
        $(document).on('click touchstart', (e) => {
            if ($(e.target).closest('.right-aside-toggle').length === 0 && $(e.target).closest('.right-toggle-switch').length === 0) {
                $('.rightbar').removeClass('right-aside-toggle');
            }
            if ($('body').hasClass('overlay-leftbar')) {
                if ($(e.target).closest('.leftbar').length === 0 && $(e.target).closest('.left-toggle-switch').length === 0) {
                    $('body').removeClass('left-aside-toggle');
                }
            }
            if ($(e.target).closest('.topbar-right').length === 0 && $(e.target).closest('.btn-mobile-bar').length === 0) {
                $('.topbar-right').removeClass('bar-toggle');
            }
            if ($(e.target).closest('.top-search-bar').length === 0 && $(e.target).closest('.btn-top-search').length === 0) {
                $('.top-search-bar').removeClass('search-bar-toggle');
            }
        });
    }

    render() {
        const { children, config } = this.props;

        return (
            <div>
                <AppHeader config={config} />
                <AppNav currentLocation={location.pathname} config={config} />

                <section className="main-container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 col-xs-12 col-s-12 col-lg-12">
                                {children && React.cloneElement(children, {
                                    config: config
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <ScrollToTop showUnder={ 160 } style={ { position: 'fixed', bottom: 10, right: 10, cursor: 'pointer', transitionDuration: '0.2s', transitionTimingFunction: 'linear', transitionDelay: '0s' } }>
                    <ScrollUp />
                </ScrollToTop>
            </div>
        );
    }
}

export default withRouter(App);