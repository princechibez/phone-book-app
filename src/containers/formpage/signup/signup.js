import React, { useState } from "react";

import classes from "./signup.module.css";
import Input from "../../../UI/input/input";
import { Aux } from "../../../hoc/auxi/auxi";
import Backdrop from "../../../UI/backdrop/backdrop";
import Modal from "../../../UI/modal/modal";

import axios from "../../../axios-instance";
import { Link, useNavigate } from "react-router-dom";
// import errorHandler from "../../../hoc/errorhandler/errorhandler";
import ErrorModal from "../../../UI/errorModal/errorModal";

const Signup = (props) => {
  const [ error, setError ] = useState(null);
  const [ contactData, setContactData ] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Fullname",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email",
      },
      value: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
    },
  })

  let navigate = useNavigate();

  const inputChangedandler = (event, type, identifier) => {
    let newContactData;
    let contactInfo;
    newContactData = { ...contactData };
    contactInfo = {
      ...newContactData[identifier],
    };
    contactInfo.value = event.target.value;
    newContactData[identifier] = contactInfo;
    setContactData(newContactData);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setError(null)
    let contactInfo = {};
    for (let info in contactData) {
      contactInfo[info] = contactData[info].value;
    }
    axios.put("http://localhost:5000/auth/signup", JSON.stringify(contactInfo), {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        navigate({pathname: "/login"})
      })
      .catch((err) => {
        setError(err.response);
      });
  };

  let formDataArray = [];
  for (let key in contactData) {
    formDataArray.push({ ...contactData[key], key: key });
  }

  return (
    <Aux>
      <section className={classes.body}>
        <Backdrop show />
        <ErrorModal show={error}>
          { error ? error.data : null }
        </ErrorModal>
        <form onSubmit={formSubmitHandler}>
          <h1>Signup</h1>
          {formDataArray.map((element, i) => (
            <Input
              key={i}
              elementType={element.elementType}
              elementConfig={element.elementConfig}
              value={element.elementConfig.value}
              changed={(event) =>
                inputChangedandler(
                  event,
                  element.elementConfig.type,
                  element.key
                )
              }
            />
          ))}
          <button type="sumbit">Signup</button>
          <h4>
            Already have an account? then{" "}
            <Link to="/login">login here</Link>
          </h4>
          <div className={classes.icon_sec}>
            <Link to="/">
              <i class="fa-solid fa-house-laptop"></i>
            </Link>
          </div>
        </form>
      </section>
    </Aux>
  );
};

export default Signup;
