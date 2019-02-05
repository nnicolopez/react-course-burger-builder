import React from 'react';

import classes from './BuildControls.module.scss';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(control => {
            return <BuildControl key={control.label} label={control.label} />
        })}
    </div>
);
 
export default buildControls;