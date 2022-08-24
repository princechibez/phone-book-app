import React from "react";

import classes from './contact.module.css';

import sideImageIcon from '../../Assets/images/camera.png'


const contactlist = (props) => {
    return(
    <div className={classes.body}>
            <div className={classes.img_section}>
                <img src={
                    props.image === "" ? sideImageIcon : 
                    `http://localhost:5000/${props.image}`
                } alt="profile_image" />
            </div>
            <div className={classes.text_section}>
                <h2>{props.name}</h2>
                <h3>{props.number}</h3>
            </div>
        </div>
    )
}

export default contactlist;