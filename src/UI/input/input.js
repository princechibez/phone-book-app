import React from "react";

import classes from './input.module.css';

const input = (props) => {
    let inputElement;

    switch (props.elementType)  {
        case "input":
            inputElement = (
                <div className={classes.div}>
                    <i class={props.iconClass}></i>
                    <input {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
                </div>
            );
            break;

        case "file":
            inputElement = (
                <div className={classes.div}>
                    <i class={props.iconClass}></i>
                    <input type="file"
                    accept="image/*"
                    value={props.value}
                    onChange={props.changed} />
                </div>
            );
            break;

        // case "textarea":
        //     inputElement = <textarea {...props} value={props.value}></textarea>
        //     break;
        
        case "select":
            inputElement = (
            <select className={classes.select} value={props.value}>
                <option>Choose Category</option>
                {
                    props.elementConfig.map((option, index) => (
                        <option key={index} value={option.value}>{option.displayValue}</option>
                    ))
                }
            </select>);
            break;

        default:
            inputElement = null
    }

    return inputElement;
}

export default input;