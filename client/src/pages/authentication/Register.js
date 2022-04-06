import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="container-flex container-vertical container-vertical-center mx-2">
        <h1 className="text-primary text-large">Welcome Aboard!</h1>
        <p className="text-medium text-dark">
          Register a new account
        </p>
        <form
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
          />
          <input type="submit" value="Register" className="btn btn-primary" />
        </form>
        <p className="my-1 text-dark text-small">
          Already have an account?{' '}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
