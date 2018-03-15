import React, { Component } from 'react';
import { Formik } from 'formik';
import Yup from 'yup';

export function Page({ children }) {
  return children;
}

export default class WizardForm extends Component {
  constructor(props) {
    super(props);

    this.previous = this.previous.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next(values) {
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  }

  handleSubmit(values, bag) {
    const { children, handleSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;

    console.log('isLastPage', isLastPage);

    if (isLastPage) {
      return handleSubmit(values);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  previous() {
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));
  }

  validate(values) {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];

    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  render() {
    const { handleSubmit, children, prevButton, nextButton } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];

    return <Formik
      initialValues={values}
      enableReinitialize={false}
      onSubmit={this.handleSubmit}
      validate={this.validate}
      render={({ values, errors, handleSubmit, isSubmitting, handleReset }) => (
        <form onSubmit={handleSubmit}>
          {activePage}
          <br/>
          {prevButton({onClick: this.previous})}
          <br/>
          {nextButton()}
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </form>
      )}
      />
    }
}
