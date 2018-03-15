import React from 'react';

export default function CustomInput({ field, form }) {
  const touched = form.touched[field.name];
  const errors = form.errors && form.errors[field.name] ? form.errors[field.name] : null;

  return <div>
      <input {...field} />
      {touched && errors && <p>{errors}</p>}
  </div>;
}
