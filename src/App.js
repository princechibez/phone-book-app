import React, { Component } from 'react';

import classes from './App.module.css';
import Homepage from './containers/homepage/homepage';
import Contacts from './containers/contacts/contacts';
import { Routes, Route } from 'react-router-dom';
import FormPage from './containers/formpage/formpage';

class App extends Component {

  render () {
    return (
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/new-contact" element={ <FormPage /> } />
        <Route path="/contact-list/*" element={ <Contacts /> } />
      </Routes>
    );
  }

}

export default App;
