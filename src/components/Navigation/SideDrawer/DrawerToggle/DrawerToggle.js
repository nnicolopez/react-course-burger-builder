import React from 'react';

import classes from './DrawerToggle.module.scss';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <span className={classes.DrawerToggle__icon}>&nbsp;</span>
    </div>
);

export default drawerToggle;