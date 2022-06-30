import React from "react";

import classes from './navigation.module.css';
import logo from '../../Assets/images/phone.png';
import { Aux } from "../../hoc/auxi/auxi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Navigation = (props) => {
    let navigate = useNavigate();

    return (
    <Aux>
        <header className={classes.head}>
        <section className={classes.logo_section} onClick={() => navigate('/')}>
            <img src={logo} alt="logo" />
            <h3>Phonebook</h3>
        </section>
        <section className={classes.nav_section}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/contact-list"
                        className={({isActive}) => isActive ? classes.active : null}>
                        <i class="fa-solid fa-users-viewfinder"></i>Contacts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-contact"
                        className={ ({isActive}) => isActive ? classes.active : null }>
                        <i class="fa-solid fa-user-plus"></i>Add </NavLink>
                    </li>
                </ul>
            </nav>
        </section>
        {props.show_auth ? <section className={classes.auth_section}>
            <button>Login</button>
            <button>Sign up</button>
        </section> : null}
        <Outlet />
    </header>
    </Aux>
);
}
    

export default Navigation;