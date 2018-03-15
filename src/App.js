import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WizardForm, { Page } from './components/WizardForm';
import { Field } from 'formik';
import { emailValidator, nameValidator } from './components/validators';
import Yup from 'yup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <WizardForm
          initialValues={{
            name: 'Some name',
            email: ''
          }}
          handleSubmit={(values) => console.log('form submit', values)}
          nextButton={() => {
            return <button type="submit">Next »</button>
          }}
          prevButton={({onClick}) => {
            return <button type="button" onClick={onClick}>
              « Previous
            </button>
          }}
        >
        <Page validate={emailValidator}>
          <Field name="email" type="text" placeholder="Email" />
        </Page>
        <Page validate={nameValidator}>
          <Field name="name" type="text" placeholder="Name" />
        </Page>
        </WizardForm>
      </div>
    );
  }
}

export default App;
