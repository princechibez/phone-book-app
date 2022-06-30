import React, { Component } from "react";

import classes from './contacts.module.css';

import Spinner from "../../UI/spinner/spinner";
import Contactlist from "../contactlist/contact";
import { Aux } from "../../hoc/auxi/auxi";
import Contactdetail from "./contactdetail/contactdetail";

import axios from "../../axios-instance";
import Navigation from "../../components/navigation/navigation";
import { Link, NavLink, Route, Routes } from "react-router-dom";

import errorHandler from "../../hoc/errorhandler/errorhandler";

import * as actions from '../../store/index';
import { connect } from "react-redux";

class Contacts extends Component {

    state = {
        contacts: null
    }

    componentDidMount () {
       this.props.onFetchContacts(axios);
    }

    render() {
        let infoDisplay;
        let contactDisplay;
    //    console.log(this.props.contacts);
        if (this.props.error) {
            infoDisplay = <p 
        style={{textAlign: "center", fontSize:"x-large", color: "white"}}>
            Can't Load Contacts, Try again later.
            </p> 
        } else if (this.props.loading) {
            infoDisplay = <Spinner />;
        } else if (!this.props.contacts || this.props.contacts)  {
                contactDisplay = [];
           for (let keys in this.props.contacts)  {
                contactDisplay.push({...this.props.contacts[keys], id: keys})
            }
            if (contactDisplay.length === 0)  {
                infoDisplay = (
                    <div className={classes.empty_contacts}>
                        <i class="fa-solid fa-user-plus"></i>
                        <h1>You currently do not have any contact now</h1>
                        <NavLink to="/new-contact"><button>Start adding contacts</button></NavLink>
                    </div>
                );
            } else if (contactDisplay.length > 0)  {
                infoDisplay = contactDisplay.map(contact => (
                    <Link to={`/contact-list/${contact.id}`} key={contact.id}>
                        <Contactlist name={contact.name} number={contact.phone} />
                    </Link>
                ));
            }
    }
        

    return (
        <Aux>
            <div className={classes.nav}>
            <Navigation show_auth />
            </div>
        <section className={classes.body}>
            <div className={classes.col_left}>
                {infoDisplay}
            </div>
            <div className={classes.col_right}>
            <Routes>
                <Route path="/:contactId" element={ <Contactdetail list_of_contacts={contactDisplay} /> } />
            </Routes>
            </div>
        </section>
    </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        loading: state.loading,
        contacts: state.contacts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchContacts: (axios) => dispatch(actions.fetchContacts(axios))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Contacts, axios));