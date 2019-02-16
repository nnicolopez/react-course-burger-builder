import React from 'react';

import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavButton from '../../UI/NavButton/NavButton';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <NavButton clicked={props.showMenu}/>
        <div className={classes.LogoBox}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;