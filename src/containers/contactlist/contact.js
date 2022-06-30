import React from "react";

import classes from './contact.module.css';

import sideImageIcon from '../../Assets/images/vecteezy_note-book-hand-phone-with-pencil-cartoon-vector-icon_6096482.jpg'

const contactlist = (props) => (

        <div className={classes.body}>
            <div className={classes.img_section}>
                <img src={sideImageIcon} />
            </div>
            <div className={classes.text_section}>
                <h2>{props.name}</h2>
                <h3>{props.number}</h3>
            </div>
        </div>

    );

export default contactlist;