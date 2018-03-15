import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WizardForm, { Page } from './components/WizardForm';
import { Field } from 'formik';
import { emailPasswordValidator, nameValidator } from './components/validators';
import CustomInput from './components/CustomInput';
import CustomWizardControls from './components/CustomWizardControls';

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
            name: 'John Doe',
            email: 'email@example.com',
            password: '123123'
          }}
          handleSubmit={(values, { setSubmitting }) => {
            console.log('form submitted with values: ', values)
            setTimeout(() => setSubmitting(false), 2000);
          }}
          controls={CustomWizardControls}
        >
          <Page validate={emailPasswordValidator}>
            <div>
              <h3>Step 1</h3>
              <Field name="email" type="text" placeholder="Email" component={CustomInput} />
              <br/>
              <Field name="password" type="password" placeholder="Password" component={CustomInput} />
            </div>
          </Page>
          <Page validate={nameValidator}>
            <div>
              <h3>Step 2</h3>
              <Field name="name" type="text" placeholder="Name" component={CustomInput} />
            </div>
          </Page>
        </WizardForm>
      </div>
    );
  }
}

export default App;
