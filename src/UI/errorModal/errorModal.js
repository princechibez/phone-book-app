import React, { useEffect, useState } from "react";

import classes from './errorModal.module.css';
import { Aux } from "../../hoc/auxi/auxi";

const ErrorModal = (props) => {

    return (
        props.show ? <Aux>
        <div className={classes.Modal}
    style={{
        transform: props.show ? "translateX(0)" : "translateX(-100vh)",
        opacity: props.show ? "1" : "0"
    }}>
        {props.children}
    </div>
        </Aux> : null
    );
}

export default ErrorModal;