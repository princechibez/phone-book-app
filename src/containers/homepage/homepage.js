import React from "react";

import classes from './homepage.module.css';
import Navigation from "../../components/navigation/navigation";
import { Aux } from "../../hoc/auxi/auxi";

import sideImage from '../../Assets/images/phonebook icon1.png';
import editImage from '../../Assets/images/phonebook icon 2.png';
import searchImg from '../../Assets/images/phonebook icon 3.png';
import enjoyImg from '../../Assets/images/vecteezy_note-book-hand-phone-with-pencil-cartoon-vector-icon_6096482.jpg'
import { NavLink } from "react-router-dom";
// import { Routes } from "react-router-dom";

const homepage = (props) => (
    <Aux>
        <section className={classes.body}>
        <Navigation show_auth/>
        <section className={classes.inner_upper_body}>
            <div className={classes.image_section}>
                <img src={sideImage} height="350px" alt="left-side Image"/>
            </div>
            <div className={classes.text_section}>
                <h1>All features in <br /> one Phonebook app</h1>
                <p>
                    This application has a very <br />cool user interface
                    and has many<br /> features in it that makes it exceptional.
                </p>
                <NavLink to="/new-contact"><button>Start adding contacts</button></NavLink>
            </div>
        </section>
        <section className={classes.row}>
            <div>
                <img src={editImage} alt="icon one" />
                <h3>Editing</h3>
                <p>Very Efficient</p>
            </div>
            <div>
                <img src={searchImg} alt="icon two" />
                <h3>Search</h3>
                <p>Very easy to find contact</p>
            </div>
            <div>
                <img src={enjoyImg} alt="icon three" />
                <h3>UI</h3>
                <p>Trust you will enjoy the app</p>
            </div>
        </section>
    </section>
    </Aux>
);

export default homepage;