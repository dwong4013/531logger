import React, { Fragment } from 'react';


export default function Input({type, name, register, validation, errors}) {
  return (
      <Fragment>
        <input
            type={type} {...register(name, validation)} />
            {errors[name] && <p className="text-primary text-small">{errors[name].message}</p>}
      </Fragment>
  )
}
