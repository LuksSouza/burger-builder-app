import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css'
import NavigationItens from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle clicked={props.drawerToogleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItens />
        </nav>
    </header>
);

export default toolbar;