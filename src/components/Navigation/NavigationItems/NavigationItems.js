import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem active link="/">Burger Builder</NavigationItem>
        <NavigationItem>Checkout</NavigationItem>

    </ul>
);

export default navigationItems;