import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WizardForm, { Page } from './components/WizardForm';
import { Field } from 'formik';
import { emailPasswordValidator, nameValidator } from './components/validators';
import CustomInput from './components/CustomInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/>
        <WizardForm
          initialValues={{
            name: 'Some name',
            email: '',
            password: ''
          }}
          handleSubmit={(values) => console.log('form submitted with values: ', values)}
          nextButton={({ isLastPage }) => {
            return <button type="submit">{ isLastPage ? 'Finish signup' : 'Next »'}</button>
          }}
          prevButton={({ onClick, isFirstPage }) => {
            if (isFirstPage) {
              return null;
            }

            return <button type="button" onClick={onClick}>
               « Previous
            </button>
          }}
        >
          <Page validate={emailPasswordValidator}>
            <Field name="email" type="text" placeholder="Email" component={CustomInput} />
            <br/>
            <Field name="password" type="password" placeholder="Password" component={CustomInput} />
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
