import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Landing = () => {
  return (
    <Fragment>
      <section className="container-landing">
        <div className="landing-items container-flex container-vertical container-vertical-center bg-primary">
            <FontAwesomeIcon className="logo" icon={solid('dumbbell')} size="8x" />
            <h1 className="app-name text text-large">
              More Plates
            </h1>
          <div className="buttons container-flex container-horizontal my-2">
            <Link to="/login" className="btn btn-large btn-primary-dark">
              Login
            </Link>
            <Link to="register" className="btn btn-large btn-light">
              Register
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
