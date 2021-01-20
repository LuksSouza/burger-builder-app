import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar drawerToogleClicked={this.sideDrawerToogleHandler} />
                <SideDrawer open={this.state.showSideDrawer} clicked={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

} 

export default Layout;