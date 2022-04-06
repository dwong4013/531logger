import React, { Fragment } from 'react';


export default function Input({name, register, validation, errors, ...rest}) {
  return (
      <Fragment>
        <input {...register(name, validation)} {...rest} />
        {errors[name] && <p className="text-primary text-small">{errors[name].message}</p>}
      </Fragment>
  )
}
