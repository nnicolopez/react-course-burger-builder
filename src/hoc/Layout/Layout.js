import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  return (
    <>
      <Toolbar 
        isAuth={props.isAuthenticated}
        toggleDrawer={() => setShowSideDrawer(!showSideDrawer)} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={() => setShowSideDrawer(false)} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);