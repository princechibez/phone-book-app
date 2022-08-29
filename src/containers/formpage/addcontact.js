import React, { useState, useEffect } from "react";

import classes from "./addcontact.module.css";
import Input from "../../UI/input/input";
import { Aux } from "../../hoc/auxi/auxi";
import Backdrop from "../../UI/backdrop/backdrop";
import ErrorModal from "../../UI/errorModal/errorModal";

import { connect } from "react-redux";
import axios from "../../axios-instance";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const AddContact = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    if(!props.auth) {
      navigate("/login")
    }
  }, [])
  
  const [searchParams] = useSearchParams();
  const valuesFromUrlQuery = {};
  for (const param of searchParams.entries()) {
    valuesFromUrlQuery[param[0]] = param[1];
  }

  let [error, setError] = useState(null);
  let [contactData, setContactData] = useState({
    contactName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Fullname",
      },
      value: valuesFromUrlQuery.editing ? valuesFromUrlQuery.contactName : "",
    },
    contactNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Phone Number",
      },
      value: valuesFromUrlQuery.editing ? valuesFromUrlQuery.contactNumber : "",
    },
    contactCategory: {
      elementType: "select",
      elementConfig: [
        { value: "Family", displayValue: "Family" },
        { value: "Friend", displayValue: "Friend" },
        { value: "Colleague", displayValue: "Colleague" },
      ],
      value: valuesFromUrlQuery.editing
        ? valuesFromUrlQuery.contactCategory
        : "",
    },
  });

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
    try {
      let response = null;
    if (valuesFromUrlQuery.editing) {
      response = await axios.patch(
        `http://localhost:5000/users/updatecontact/${valuesFromUrlQuery.contactId}`,
        JSON.stringify(contactInfo),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        return navigate({
          pathname: `/contact-list/${response.data.contact._id}`,
        });
      }
    }

    response = await axios.post(
      "http://localhost:5000/users/addcontact",
      JSON.stringify(contactInfo),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      navigate({ pathname: `/contact-list/${response.data.newContact[0]._id}` });
    }
    } catch(err) {
      setError(err.response)
    }
  };

  let formDataArray = [];
  for (let key in contactData) {
    formDataArray.push({ ...contactData[key], key: key });
  }

  return (
    <Aux>
      <section className={classes.body}>
        <Backdrop show />
        <ErrorModal show={error}>{error ? error.data : null}</ErrorModal>
        <form onSubmit={formSubmitHandler}>
          <h1>{valuesFromUrlQuery.editing ? `Update ${valuesFromUrlQuery.contactName}` : "Add new contact"}</h1>
          {formDataArray.map((element, i) => (
            <Input
              key={i}
              elementType={element.elementType}
              elementConfig={element.elementConfig}
              value={element.value}
              changed={(event) =>
                inputChangedandler(
                  event,
                  element.elementConfig.type,
                  element.key
                )
              }
            />
          ))}
          <button type="sumbit">
            {valuesFromUrlQuery.editing ? "Update contact" : "Add Contact"}
          </button>
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AddContact);
