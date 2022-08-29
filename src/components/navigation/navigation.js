import React from "react";
import { connect } from "react-redux";

import classes from "./navigation.module.css";
import logo from "../../Assets/images/phone.png";
import { Aux } from "../../hoc/auxi/auxi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import * as actiontypes from "../../store/index";

const Navigation = (props) => {
  let navigate = useNavigate();

  return (
    <Aux>
      <header className={classes.head}>
        <section
          className={classes.sideBar_icon} >
          <i class="fa-solid fa-bars"
          onClick={() => props.showSideBar()}></i>
        </section>
        <section className={classes.logo_section} onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h3>Phonebook</h3>
        </section>
        <section className={classes.nav_section}>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/contact-list"
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                >
                  <i class="fa-solid fa-users-viewfinder"></i>Contacts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/new-contact"
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                >
                  <i class="fa-solid fa-user-plus"></i>Add
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
        {!props.auth ? (
          <section className={classes.auth_section}>
            <button><NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                >Login</NavLink></button>
            <button><NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                >Sign up</NavLink></button>
          </section>
        ) : <section className={classes.auth_section}>
          <button style={{marginLeft: "5em"}} onClick={() => {
          props.onLogout()
          navigate("/login")
        }}>Logout</button>
        </section> }
        <Outlet />
      </header>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actiontypes.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
