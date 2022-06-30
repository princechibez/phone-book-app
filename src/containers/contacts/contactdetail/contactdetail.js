import React from "react";

import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../../axios-instance';

import classes from './contactdetail.module.css';
import sideImageIcon from '../../../Assets/images/vecteezy_note-book-hand-phone-with-pencil-cartoon-vector-icon_6096482.jpg';

const Contactdetail = (props) => {
    let params = useParams();
    // let navigate = useNavigate();

    // let updatedContactsObject = {};

    let selected_contact_id = params.contactId;
    let list_of_contacts = props.list_of_contacts;


    let selectedContact = list_of_contacts.find(contact => contact.id === selected_contact_id);
    // console.log(selectedContact)

    // const deleteContactHandler = () => {
    //     axios.get("/contactInfo.json")
    //     .then(contacts => {
    //         // updatedContactsObject = {...contacts.data}
    //         // delete updatedContactsObject[selected_contact_id];
    //         // navigate("/contact-list");
    //     })
    //     .catch(err => console.log(err))
    // }

    // const updateContactHandler = () => {
        
    // }
    
    return (
        <div className={classes.detailed_body}>
            <div className={classes.img_section}>
                <img src={sideImageIcon} />
            </div>
            <h1>{selectedContact.name}</h1>
            <h4>{selectedContact.phone}</h4>
            <button className={classes.button_one}>Delete Contact</button>
            <button className={classes.button_two}>Update Contact</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contacts: state.contacts
    }
}

export default connect(mapStateToProps, null)(Contactdetail);