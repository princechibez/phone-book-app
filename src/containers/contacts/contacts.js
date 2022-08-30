import React, { useEffect, useState } from "react";

import classes from "./contacts.module.css";

import Spinner from "../../UI/spinner/spinner";
import SideBar from "../../UI/sideBar/sideBar";
import Contactlist from "../contactlist/contact";
import { Aux } from "../../hoc/auxi/auxi";
import Contactdetail from "./contactdetail/contactdetail";

import axios from "../../axios-instance";
import Navigation from "../../components/navigation/navigation";
import { Link, NavLink, Route, Routes, useSearchParams, useNavigate } from "react-router-dom";

import errorHandler from "../../hoc/errorhandler/errorhandler";

import * as actions from "../../store/index";
import { connect } from "react-redux";

const Contacts = (props) => {
  const navigate = useNavigate();
  const [ state, setState ] = useState({
    contacts: null,
    sideBar: false,
    fallBackMessage: true,
  })

  useEffect(() => {
    props.onFetchContacts(axios);
  }, [])
  if(!props.auth) {
    navigate("/login")
  }

    let infoDisplay;
    let contactDisplay;
    let fallBack = null;
    if (props.error) {
      infoDisplay = (
        <p style={{ textAlign: "center", fontSize: "x-large", color: "white" }}>
          Can't Load Contacts, Try again later.
        </p>
      );
    } else if (props.loading) {
      infoDisplay = <Spinner />;
    } else if (!props.contacts || props.contacts) {
      contactDisplay = [];
      for (let key of props.contacts) {
        contactDisplay.push(key);
      }

      if(state.fallBackMessage && contactDisplay.length !== 0){
        fallBack = <h1 className={classes.fallBackTxt}>Click one contact</h1>
      } else if(state.fallBackMessage && contactDisplay.length === 0) {
        fallBack = <h1 className={classes.fallBackTxt}>Start adding contacts</h1>
      }
      
        if (contactDisplay.length === 0) {
        infoDisplay = (
          <div className={classes.empty_contacts}>
            <i class="fa-solid fa-user-plus"></i>
            <h1>You currently do not have any contact now</h1>
            <NavLink to="/new-contact">
              <button>Start adding contacts</button>
            </NavLink>
          </div>
        );
      } else if (contactDisplay.length > 0) {
        infoDisplay = contactDisplay.map((contact) => (
          <Link
            to={`/contact-list/${contact._id}`}
            key={contact._id}
          >
            <Contactlist
                name={contact.contactName}
                number={contact.contactNumber}
                image={contact.contactImage} />
          </Link>
        ));
      }
    }

    const closeSideBar = () => {
      setState({ sideBar: false });
    };
    const showSideBar = () => {
      setState({ sideBar: true });
    };

    return (
      <Aux>
        <div className={classes.nav}>
          <SideBar
            closeSideBar={closeSideBar}
            show={state.sideBar}
          />
          <Navigation showSideBar={showSideBar} />
        </div>
        <section className={classes.body}>
          <div className={classes.col_left}>{infoDisplay}</div>
          <div className={classes.col_right}>
            {fallBack}
            <Routes>
              <Route
                path="/:contactId"
                element={
                  <Contactdetail
                    viewer={() => setState({ fallBackMessage: false })}
                    list_of_contacts={contactDisplay}
                  />
                }
              />
            </Routes>
          </div>
        </section>
      </Aux>
    );
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    loading: state.loading,
    contacts: state.contacts,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchContacts: (axios) => dispatch(actions.fetchContacts(axios)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Contacts, axios));
