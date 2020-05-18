import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
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

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        action="dashboard.html"
        className="form"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account?{' '}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
