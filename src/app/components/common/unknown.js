﻿import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Unknown extends Component {
    static propTypes = {
        router: React.PropTypes.object,
        config: React.PropTypes.object
    };

    render() {
        const boldTitle = (this.props.config && this.props.config.boldTitle) ? this.props.config.boldTitle : '';
        const regTitle = (this.props.config && this.props.config.title) ? this.props.config.title : '';
        return (
            <div className="unknown-state center">
                <p>
                     <span className="loginFont">
                         <span className="bold" >
                            {boldTitle}
                         </span>
                         <span>
                            {regTitle}
                         </span>
                     </span>

                </p>
                <i className="fa fa-cog fa-spin fa-5x" />
            </div>
        );
    }
}

export default withRouter(Unknown);
