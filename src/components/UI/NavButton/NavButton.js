import React from 'react';

import classes from './NavButton.module.scss';

const navButton = (props) => (
    <div className={classes.NavButton} onClick={props.clicked}>
        <span className={classes.NavButton__icon}>&nbsp;</span>
    </div>
)

export default navButton;