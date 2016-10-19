import React, {Component} from 'react';
import {connect} from 'react-redux';
import { AppBar, Checkbox, IconButton, Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

class layout extends Component {
    constructor(props) {
        super(props);
        this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
        this.toggleDrawerPinned = this.toggleDrawerPinned.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.state = {
            drawerActive: false,
            drawerPinned: false,
            sidebarPinned: false
        }
    }
    toggleDrawerActive() {
        this.setState({ drawerActive: !this.state.drawerActive });
    }
    toggleDrawerPinned() {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }
    toggleSidebar() {
        this.setState({ sidebarPinned: !this.state.sidebarPinned });
    }
    render() {
        return (
            <Layout>
                <NavDrawer active={this.state.drawerActive}
                  pinned={this.state.drawerPinned} permanentAt='xxxl'
                  onOverlayClick={this.toggleDrawerActive} >
                    <p>Navigation, Account Switcher, Etc. Go Here</p>
                </NavDrawer>
                <Panel>
                    <AppBar><IconButton icon="menu" inverse={true} onClick={this.toggleDrawerActive} /></AppBar>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        <h1>Main Content</h1>
                        <p>Main Content Goes Here</p>
                        <Checkbox label="Pin Drawer" checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
                        <Checkbox label="Show Sidebar" checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />
                    </div>
                </Panel>
                <Sidebar pinned={this.state.sidebarPinned} width={5} >
                    <div><IconButton icon="close" onClick={this.toggleSidebar} /></div>
                    <div style={{ flex: 1 }} >
                        <p>Supplemental Content Goes Here</p>
                    </div>
                </Sidebar>
            </Layout>
        );
    }
}
 /* Map your state reducers to props that may be used in this component 
* and passed on to any components contained within this component */
function mapStateToProps(state){
    return {
        sampleProp: state
    };
}

layout.propTypes = {
    exampleProp: React.PropTypes.any
};

export default connect(mapStateToProps)(layout);