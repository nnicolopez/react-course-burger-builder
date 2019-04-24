import React, { useMemo } from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) =>  {

  return useMemo(() => (
    <>
      <Backdrop
          show={props.show}
          clicked={props.modalClose} />
      <div
          className={classes.Modal}
          style={{
              transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
              opacity: props.show ? '1' : '0'
          }}>
          {props.children}
      </div>
    </>), 
    [props.show, props.children]
  );
}

export default modal;