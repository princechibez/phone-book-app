import React from "react";

import classes from "./pageNotFound.module.css";
import image404 from "../Assets/images/phonebook 404 image.jpg";
import { Link } from "react-router-dom";

const pageNotFound = () => (
  <div className={classes.page}>
    <img src={image404} />
    <h3>Sorry we could'nt find the page you are looking for</h3>
    <button>
        <Link to="/">Visit Home page...</Link>
    </button>
  </div>
);

export default pageNotFound;
