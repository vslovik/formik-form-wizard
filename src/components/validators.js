import Yup from 'yup';

// Synchronus validation
function validateSync(schema, values) {
  try {
    schema.validateSync(values, {abortEarly: false});

    return undefined;
  } catch (errors) {
    let preparedErrors = {};
    errors.inner.map((error) => preparedErrors[error.path] = error.message)

    return preparedErrors;
  }
}

// Async validation
function validateAsync(schema, values) {
  return schema.validate(values, {abortEarly: false})
    .then(() => undefined)
    .catch((errors) => {
      let preparedErrors = {};
      errors.inner.map((error) => preparedErrors[error.path] = error.message)

      throw preparedErrors;
    });
}

export function nameValidator(values) {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  return validateSync(schema, values);
}

export function emailPasswordValidator(values) {
  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required('Password is required').min(4)
  });

  return validateAsync(schema, values);
}
