import React, { Component } from 'react';

import classes from './App.module.css';
import Homepage from './containers/homepage/homepage';
import Contacts from './containers/contacts/contacts';
import { Routes, Route } from 'react-router-dom';
import AddContact from './containers/formpage/addcontact';
import Signup from './containers/formpage/signup/signup';
import Login from './containers/formpage/login';
import PageNotFound from './404page/pageNotFound';

class App extends Component {

  render () {
    return (
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/new-contact" element={ <AddContact /> } />
        <Route path="/contact-list/*" element={ <Contacts /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path='*' element={ <PageNotFound /> } />
      </Routes>
    );
  }

}

export default App;
