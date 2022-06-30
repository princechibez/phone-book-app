import React from "react";

import classes from './backdrop.module.css'

const backdrop = (props) => (
    props.show ? <div className={classes.backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;