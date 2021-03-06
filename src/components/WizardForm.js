import React, { Component } from 'react';
import { Formik } from 'formik';

export function Page({ children }) {
  return <div>{children}</div>;
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

    if (isLastPage) {
      return handleSubmit(values, bag);
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
    const isLastPage = page === React.Children.count(children) - 1;
    const isFirstPage = page === 0;

    const PrevButton = this.props.prevButton;
    const NextButton = this.props.nextButton;
    const Controls = this.props.controls;

    return <Formik
      initialValues={values}
      enableReinitialize={false}
      onSubmit={this.handleSubmit}
      validate={this.validate}
      render={({ values, errors, handleSubmit, isSubmitting, handleReset, submitForm }) => (
        <form onSubmit={handleSubmit}>
          {activePage}
          { this.props.controls
            ? <Controls
                next={handleSubmit}
                back={this.previous}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                isSubmitting={isSubmitting}
              />
            : <div>
              <PrevButton isFirstPage={isFirstPage} onClick={this.previous} />
              <br/>
              <NextButton isLastPage={isLastPage} />
            </div>
          }
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </form>
      )}
      />
    }
}

WizardForm.defaultProps = {
  nextButton: ({isLastPage}) => <button type="submit">{isLastPage ? 'Next' : 'Finish'}</button>,
  prevButton: ({ onClick, isFirstPage }) => {
    return isFirstPage ? <button onClick={onClick}>Previos</button> : null
  }
}
