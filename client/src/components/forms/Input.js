import React, { Fragment } from 'react';


export default function Input({name, register, validation, errors, ...rest}) {
  return (
      <Fragment>
        <input {...register(name, validation)} label={name} {...rest} />
        {errors[name] && <p className="text-primary text-small">{validation.messages[errors[name].type]}</p>}
      </Fragment>
  )
}
