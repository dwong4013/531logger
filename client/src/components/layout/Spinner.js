import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      className="spinner"
      src={spinner}
      alt="Loading..."
    />
  </Fragment>
);
