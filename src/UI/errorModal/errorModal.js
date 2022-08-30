import React, { useEffect, useState } from "react";

import classes from './errorModal.module.css';
import { Aux } from "../../hoc/auxi/auxi";

const ErrorModal = (props) => {

    return (
        props.show ? <Aux>
        <div className={classes.Modal}
    style={{
        backgroundColor: props.success ? "rgb(174, 251, 176)" : "rgb(251, 182, 174)",
        color: props.success ? "rgb(58, 222, 66)" : "rgb(222, 75, 58)",
        border: props.success ? "2px solid rgb(58, 222, 66)" : "2px solid rgb(222, 75, 58)",
        transform: props.show ? "translateX(0)" : "translateX(-100vh)",
        opacity: props.show ? "1" : "0",
        textAlign: "center"
    }}>
        {props.children}
    </div>
        </Aux> : null
    );
}

export default ErrorModal;