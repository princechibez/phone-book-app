import React, { useState } from "react";

import classes from './addcontact.module.css';
import Input from "../../UI/input/input";
import { Aux } from "../../hoc/auxi/auxi";
import Backdrop from "../../UI/backdrop/backdrop";
import ErrorModal from "../../UI/errorModal/errorModal";

import axios from "../../axios-instance";
import { Link, useNavigate } from "react-router-dom";

const AddContact = (props) => {

    let navigate = useNavigate();

    let [ error, setError ] = useState(null);
    let [ contactData, setContactData] = useState({
        contactName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Fullname"
            },
            value: ""
        },
        contactNumber : {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Phone Number"
            },
            value: ""
        },
        contactCategory: {
            elementType: "select",
            elementConfig: [
                {value: "Family", displayValue: "Family"},
                {value: "Friend", displayValue: "Friend"},
                {value: "Colleague", displayValue: "Colleague"}
            ]
        }
    })

    const inputChangedandler = (event, type, identifier) => {
        let newContactData;
        let contactInfo;
            newContactData = { ...contactData };
            contactInfo = {
                ...newContactData[identifier]
            }
            contactInfo.value = event.target.value;
            newContactData[identifier] = contactInfo
            setContactData(newContactData);
    }
    

    const formSubmitHandler = (event) => {
        event.preventDefault();
        let contactInfo = {};
        for (let info in contactData) {
            contactInfo[info] = contactData[info].value;
        }
        axios.post('http://localhost:5000/users/addcontact', JSON.stringify(contactInfo), {
            headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("token") },
        })
        .then(response => {
            setTimeout(() => {
                navigate({pathname: "/contact-list"})
            }, 2000);
        })
        .catch(err => {
            setError(err.response)
        });
    }
    
    let formDataArray = [];
    for (let key in contactData) {
            formDataArray.push({...contactData[key], key: key})          
    }

    return (
        <Aux>
        <section className={classes.body}>
            <Backdrop show />
            <ErrorModal show={error}>
                { error ? error.data : null }
            </ErrorModal>
                <form onSubmit={formSubmitHandler}>
                    <h1>Add new contact</h1>
                    {
                        formDataArray.map((element, i) => (
                                <Input 
                                key={i}
                                elementType={element.elementType}
                                elementConfig={element.elementConfig}
                                value={element.elementConfig.value}
                                changed={(event) => inputChangedandler(event, element.elementConfig.type, element.key)}
                                />
                        ))
                    }
                    <button type="sumbit">Add Contact</button>
                    <div className={classes.icon_sec}>
                        <Link to="/"><i class="fa-solid fa-house-laptop"></i></Link>
                    </div>
                </form>
        </section>
        </Aux>
    );
};

export default AddContact;