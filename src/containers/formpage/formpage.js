import React from "react";

import classes from './formpage.module.css';
import Input from "../../UI/input/input";
import { Aux } from "../../hoc/auxi/auxi";
import Backdrop from "../../UI/backdrop/backdrop";

import axios from "../../axios-instance";
import { Link, useNavigate } from "react-router-dom";
import errorHandler from "../../hoc/errorhandler/errorhandler";

const FormPage = (props) => {

    let navigate = useNavigate();

    let contactData = {
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Fullname"
            },
            iconClass: "fa-solid fa-file-signature",
            value: ""
        },
        phone : {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Phone Number"
            },
            iconClass: "fa-solid fa-phone",
            value: ""
        },
        picture: {
            elementType: "file",
            elementConfig: {
                type: "file"
            },
            value: null
        },
        category: {
            elementType: "select",
            elementConfig: [
                {value: "Family", displayValue: "Family"},
                {value: "Friend", displayValue: "Friend"},
                {value: "Colleague", displayValue: "Colleague"}
            ]
        }
    }

    // let imageGallery = [classes.body_one, classes.body_two];
    // let returnedClass;

    // setInterval(() => {
    //     let imageIndex = parseInt(Number(Math.random() * imageGallery.length));
    //     returnedClass = imageGallery[imageIndex];
    // }, 2000);
    

    let formDataArray = [];
    for (let key in contactData) {
            formDataArray.push({...contactData[key], key: key})          
    }

    const inputChangedandler = (event, type, identifier) => {
        let newContactData;
        let contactInfo;
        if (type === "file") {
            newContactData = { ...contactData };
            contactInfo = {
                ...newContactData[identifier]
            }
            contactInfo.value = event.target.files[0];
            console.log(contactInfo.value)
            newContactData[identifier] = contactInfo
            contactData = newContactData;
        } else {
            newContactData = { ...contactData };
            contactInfo = {
                ...newContactData[identifier]
            }
            contactInfo.value = event.target.value;
            newContactData[identifier] = contactInfo
            contactData = newContactData;
        }
    }
    

    const formSubmitHandler = (event) => {
        event.preventDefault();
        let contactInfo = {};
        for (let info in contactData) {
            contactInfo[info] = contactData[info].value;
        }
        axios.post('/contactInfo.json', contactInfo)
        .then(response => {
            navigate({pathname: "/contact-list"})
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <Aux>
        <section className={classes.body}>
            <Backdrop show />
                <form onSubmit={formSubmitHandler}>
                    <h1>Add new contact</h1>
                    {
                        formDataArray.map((element, i) => (
                                <Input 
                                key={i}
                                iconClass={element.iconClass}
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

export default FormPage;