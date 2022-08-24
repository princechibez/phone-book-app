import React from "react";
import { Aux } from "../../hoc/auxi/auxi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import logo from "../../Assets/images/phone.png";
import BackDrop from "../backdrop/backdrop";

import classes from "./sideBar.module.css";

const SideBar = (props) => {
  let navigate = useNavigate();

  let sideBarStyles = [classes.sideBar];

  if(props.show) {
    sideBarStyles.push(classes.openSideBar)
  } else {
    sideBarStyles.push(classes.closeSideBar)
  }

  return (
    <Aux>
      <BackDrop show={props.show} clicked={() => props.closeSideBar()} />
      <div className={sideBarStyles.join(" ")}>
        <header className={classes.head}>
          <section className={classes.sideBar_top}>
            <div className={classes.sideBar_icon}>
            <i
              class="fa-solid fa-xmark"
              onClick={() => props.closeSideBar()}
            ></i>
            </div>
            <div
            className={classes.logo_section}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" />
            <h3>Phonebook</h3>
          </div>
          </section>
          <section className={classes.nav_section}>
            <nav>
              <ul>
              <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? classes.active : null
                    }
                  >
                    <i class="fa-solid fa-users-viewfinder"></i>Home
                  </NavLink>
                </li>
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
                    <i class="fa-solid fa-user-plus"></i>Add{" "}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </section>
          {props.show_auth ? (
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
          ) : null}
          <Outlet />
        </header>
      </div>
    </Aux>
  );
};

export default SideBar;
