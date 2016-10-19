import React, { Component } from 'react';
import AppHeader from './header';
import AppNav from './nav';
import AppNotifications from './notifications';
import Notifications from '../common/js/forge/support/notifications';
import ScrollToTop from 'react-scroll-up';
import $ from 'jquery';
import noty from 'noty';
import moment from 'moment';
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
    componentWillMount() {
        this.subscribeToSystemNotifications();
    }

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

    componentWillUnmount() {
        Notifications.unsubscribe('system.notification');
        Notifications.disconnect(this.receivedNotification);
    }

    receivedSystemNotification = (data) => {
        const { notificationActions } = this.props;
        const notification = JSON.parse(data);
        notificationActions.systemNotificationReceived(data);

        let notificationType = 'success';
        if (notification.Type === 'warning') {
            notificationType = 'warning';
        }
        if (notification.Type === 'downtime') {
            notificationType = 'error';
        }

        const notyText = `<span className="notification-message">${notification.Message}<span class="message-time clearfix">${moment(notification.Sent).format('MMM D h:mm A')}</span></span>`;
        noty({
            animation: {
                open: 'animated rubberBand', // Animate.css class names
                close: 'animated lightSpeedOut' // Animate.css class names
            },
            closeWith: ['click'],
            dismissQueue: true,
            force: true,
            layout: 'topRight',
            text: notyText,
            theme: 'relax',
            type: notificationType
        });
    };

    subscribeToSystemNotifications() {
        const { auth } = this.props;
        if (auth.userAuthenticated) {
            Notifications.connect(() => {
            });
            Notifications.subscribe('system.notification', this.receivedSystemNotification);
        }
    }

    render() {
        const { children, config, notify, authActions, notificationActions } = this.props;

        return (
            <div>
                <AppHeader notifications={notify} config={config} notificationActions={notificationActions} />
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

                <aside className="rightbar">
                    <div className="rightbar-container">
                        <AppNotifications notifications={notify} notificationActions={notificationActions} />
                    </div>
                </aside>

                <ScrollToTop showUnder={ 160 } style={ { position: 'fixed', bottom: 10, right: 10, cursor: 'pointer', transitionDuration: '0.2s', transitionTimingFunction: 'linear', transitionDelay: '0s' } }>
                    <ScrollUp />
                </ScrollToTop>
            </div>
        );
    }
}

export default withRouter(App);