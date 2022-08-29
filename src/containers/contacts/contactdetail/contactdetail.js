import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import axios from "../../../axios-instance";

import * as actionTypes from "../../../store/index";
import classes from "./contactdetail.module.css";
import sideImageIcon from "../../../Assets/images/camera.png";

const Contactdetail = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  let selected_contact_id = params.contactId;
  const [imagePreview, setImagePreview] = useState();
  useEffect(() => {
    props.viewer();
    props.fetchContact(axios, selected_contact_id);
  }, [selected_contact_id]);

  const updateContact = () => {
    const params = {
      editing: "true",
      contactName: props.contact.contactName,
      contactNumber: props.contact.contactNumber,
      contactCategory: props.contact.contactCategory,
      contactId: props.contact._id
    }
    navigate({
      pathname: "/new-contact",
      search: `?${createSearchParams(params)}`
    })
  };

  const deleteContact = () => {
    axios
      .delete(
        `http://localhost:5000/users/deletecontact/${props.contact._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        navigate(`/contact-list`, { replace: true });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const genBase64 = (file) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);
    });
    reader.readAsDataURL(file);
    return promise;
  };

  const fileChangedHandler = (e) => {
    // genBase64(e.target.files[0])
    // .then(b64 => {
    //   setImagePreview(b64);
    // })
    // .catch(err => console.log(err))
    const formData = new FormData();
    formData.append("profile-image", e.target.files[0]);
    axios
      .post(
        `http://localhost:5000/users/add-contact-profile-pix/${props.contact._id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        navigate(`/contact-list/${props.contact._id}`, { replace: true });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.detailed_body}>
      <div className={classes.img_section}>
        <img
          src={
            props.contact.contactImage === ""
              ? sideImageIcon
              : `http://localhost:5000/${props.contact.contactImage}`
          }
          alt="profile-image"
        />
        <input type="file" name="profile-image" onChange={fileChangedHandler} />
      </div>
      <h1>{`${props.contact.contactName} - ${props.contact.contactCategory}`}</h1>
      <h5>{props.contact.contactNumber}</h5>
      <button className={classes.button_one} onClick={deleteContact}>
        Delete Contact
      </button>
      <button className={classes.button_two} onClick={updateContact}>
        Update Contact
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contact: state.contact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContact: (axios, contactId) =>
      dispatch(actionTypes.fetchContact(axios, contactId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contactdetail);
