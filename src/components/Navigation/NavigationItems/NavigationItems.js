import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItens = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Build</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItens;