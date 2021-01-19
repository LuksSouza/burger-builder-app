import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css'
import NavigationItens from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItens />
        </nav>
    </header>
);

export default toolbar;