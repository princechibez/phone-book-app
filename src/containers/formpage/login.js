import React, { useState } from "react";

import classes from "./login.module.css";
import Input from "../../UI/input/input";
import { Aux } from "../../hoc/auxi/auxi";
import Backdrop from "../../UI/backdrop/backdrop";
import ErrorModal from "../../UI/errorModal/errorModal";

import axios from "../../axios-instance";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [ error, setError ] = useState(null);
  let navigate = useNavigate();

  const [ contactData, setContactData ] = useState(
    {
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
      }
  )

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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let contactInfo = {};
    for (let info in contactData) {
      contactInfo[info] = contactData[info].value;
    }
    axios
      .post("http://localhost:5000/auth/login", JSON.stringify(contactInfo), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token)
        navigate({ pathname: "/contact-list" });
      })
      .catch((err) => {
        setError(err.response);
        console.log(err.response)
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
          <h1>Add new contact</h1>
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
          <button type="sumbit">Login</button>
          <h4>
            Don't have an account yet?{" "}
            <Link to="/signup">signup here</Link>
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

export default Login;